import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Packet, PacketStatus } from '@/domain/order/enterprise/entities/packet'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { DestinationsRepository } from '../repositories/destinations-repository'
import { PacketsRepository } from '../repositories/packets-repository'
import { InvalidPacketStatus } from './errors/invalid-packet-status'

interface CreatePacketUseCaseRequest {
  destinationId: string
  delivererId: string
  status?: PacketStatus
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

  private async isDestinationExistent(destinationId: string): Promise<boolean> {
    const destination =
      await this.destinationsRepository.findById(destinationId)

    return !!destination
  }

  private async isDelivererExistent(delivererId: string): Promise<boolean> {
    const deliverer = await this.usersRepository.findById(delivererId)

    return !!deliverer
  }

  private isValidStatus(status: PacketStatus): boolean {
    return (
      status === 'DELIVERED' ||
      status === 'RETURNED' ||
      status === 'WITHDRAWAL' ||
      status === 'AWAITING_WITHDRAWAL'
    )
  }

  async execute({
    destinationId,
    delivererId,
    status,
  }: CreatePacketUseCaseRequest): Promise<CreatePacketUseCaseResponse> {
    if (!(await this.isDestinationExistent(destinationId))) {
      return left(new ResourceNotFoundError())
    }

    if (!(await this.isDelivererExistent(delivererId))) {
      return left(new ResourceNotFoundError())
    }

    if (status && !this.isValidStatus(status)) {
      return left(new InvalidPacketStatus(status))
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
