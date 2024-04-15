import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InvalidCPFError } from './errors/invalid-cpf-error'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUserUseCase } from './register-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase // Subject Under Test

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '267.859.975-26',
      email: 'jonhdoe@example.com',
      password: '123456',
      role: 'DELIVERER',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '267.859.975-26',
      email: 'jonhdoe@example.com',
      password: '123456',
      role: 'DELIVERER',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register with an invalid CPF', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: 'invalid-cfp-number',
      email: 'jonhdoe@example.com',
      password: '123456',
      role: 'DELIVERER',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCPFError)
  })

  it('should not be able to register with CPF already in use', async () => {
    await sut.execute({
      name: 'Joe Six-Pack',
      cpf: '267.859.975-26',
      email: 'joesixpack@example.com',
      password: '123456',
      role: 'DELIVERER',
    })

    const result = await sut.execute({
      name: 'John Doe',
      cpf: '267.859.975-26',
      email: 'jonhdoe@example.com',
      password: '123456',
      role: 'DELIVERER',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})

it('should not be able to register with Email already in use', async () => {
  await sut.execute({
    name: 'John Doe',
    cpf: '667.316.070-53',
    email: 'jonhdoe@example.com',
    password: '123456',
    role: 'DELIVERER',
  })

  const result = await sut.execute({
    name: 'John Doe',
    cpf: '267.859.975-26',
    email: 'jonhdoe@example.com',
    password: '123456',
    role: 'DELIVERER',
  })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
})
