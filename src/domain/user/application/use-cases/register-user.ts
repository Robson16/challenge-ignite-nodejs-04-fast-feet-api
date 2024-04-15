import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users-repository'
import { InvalidCPFError } from './errors/invalid-cpf-error'
import { InvalidUserRole } from './errors/invalid-user-role'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  cpf: string
  email: string
  password: string
  role: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError | InvalidCPFError | InvalidUserRole,
  {
    user: User
  }
>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    email,
    password,
    role,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const isCPFValid = CPF.validate(cpf)

    if (!isCPFValid) {
      return left(new InvalidCPFError())
    }

    const userWithSameCPF = await this.usersRepository.findByCPF(cpf)

    if (userWithSameCPF) {
      return left(new UserAlreadyExistsError(cpf))
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    if (!(role === 'ADMIN' || role === 'DELIVERER')) {
      return left(new InvalidUserRole(role))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      cpf: CPF.create(cpf),
      email,
      password: hashedPassword,
      role,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
