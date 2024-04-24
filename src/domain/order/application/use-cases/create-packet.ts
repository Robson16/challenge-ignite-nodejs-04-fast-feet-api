import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { DestinationsRepository } from '../repositories/destinations-repository'
import { PacketsRepository } from '../repositories/packets-repository'

interface CreatePacketUseCaseRequest {
  destinationId: string
  delivererId: string
  status: string
}

type CreatePacketUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    packet: Packet
  }
>

@Injectable()
export class CreatePacketUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private destinationsRepository: DestinationsRepository,
    private packetsRepository: PacketsRepository,
  ) {}

  async execute({
    destinationId,
    delivererId,
    status,
  }: CreatePacketUseCaseRequest): Promise<CreatePacketUseCaseResponse> {
    const isDestinationExistent =
      await this.destinationsRepository.findById(destinationId)

    if (!isDestinationExistent) {
      return left(new ResourceNotFoundError())
    }

    const isDelivererExistent = await this.usersRepository.findById(delivererId)

    if (!isDelivererExistent) {
      return left(new ResourceNotFoundError())
    }

    const packet = Packet.create({
      destinationId: new UniqueEntityID(destinationId),
      delivererId: new UniqueEntityID(delivererId),
      status,
    })

    await this.packetsRepository.create(packet)

    return right({
      packet,
    })
  }
}
