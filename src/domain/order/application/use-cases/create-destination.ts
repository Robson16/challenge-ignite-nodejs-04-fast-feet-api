import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Destination } from '@/domain/order/enterprise/entities/destination'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { DestinationsRepository } from '../repositories/destinations-repository'

interface CreateDestinationUseCaseRequest {
  recipientId: string
  title: string
  latitude: number
  longitude: number
}

type CreateDestinationUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    destination: Destination
  }
>

@Injectable()
export class CreateDestinationUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private destinationsRepository: DestinationsRepository,
  ) {}

  async execute({
    recipientId,
    title,
    latitude,
    longitude,
  }: CreateDestinationUseCaseRequest): Promise<CreateDestinationUseCaseResponse> {
    const isRecipientExistent = await this.usersRepository.findById(recipientId)

    if (!isRecipientExistent) {
      return left(new ResourceNotFoundError())
    }

    const destination = Destination.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      latitude,
      longitude,
    })

    await this.destinationsRepository.create(destination)

    return right({
      destination,
    })
  }
}
