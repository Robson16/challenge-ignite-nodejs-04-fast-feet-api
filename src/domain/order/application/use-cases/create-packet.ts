import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { Injectable } from '@nestjs/common'
import { PacketRepository } from '../repositories/packet-repository'

interface CreatePacketUseCaseRequest {
  destinationId: string
  delivererId: string
  status: string
}

type CreatePacketUseCaseResponse = Either<
  null,
  {
    packet: Packet
  }
>

@Injectable()
export class CreatePacketUseCase {
  constructor(private packetRepository: PacketRepository) {}

  async execute({
    destinationId,
    delivererId,
    status,
  }: CreatePacketUseCaseRequest): Promise<CreatePacketUseCaseResponse> {
    const packet = Packet.create({
      destinationId: new UniqueEntityID(destinationId),
      delivererId: new UniqueEntityID(delivererId),
      status,
    })

    await this.packetRepository.create(packet)

    return right({
      packet,
    })
  }
}
