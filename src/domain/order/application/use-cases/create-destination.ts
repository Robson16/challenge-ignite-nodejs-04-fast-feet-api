import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Destination } from '@/domain/order/enterprise/entities/destination'
import { Injectable } from '@nestjs/common'
import { DestinationRepository } from '../repositories/destination-repository'

interface CreateDestinationUseCaseRequest {
  recipientId: string
  title: string
  latitude: number
  longitude: number
}

type CreateDestinationUseCaseResponse = Either<
  null,
  {
    destination: Destination
  }
>

@Injectable()
export class CreateDestinationUseCase {
  constructor(private destinationRepository: DestinationRepository) {}

  async execute({
    recipientId,
    title,
    latitude,
    longitude,
  }: CreateDestinationUseCaseRequest): Promise<CreateDestinationUseCaseResponse> {
    const destination = Destination.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      latitude,
      longitude,
    })

    await this.destinationRepository.create(destination)

    return right({
      destination,
    })
  }
}
