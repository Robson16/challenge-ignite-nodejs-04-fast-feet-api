import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { PacketsRepository } from '@/domain/order/application/repositories/packets-repository'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { Injectable } from '@nestjs/common'

interface ReturnPacketUseCaseRequest {
  packetId: string
}

type ReturnPacketUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    packet: Packet
  }
>

@Injectable()
export class ReturnPacketUseCase {
  constructor(private packetsRepository: PacketsRepository) {}

  async execute({
    packetId,
  }: ReturnPacketUseCaseRequest): Promise<ReturnPacketUseCaseResponse> {
    const packet = await this.packetsRepository.findById(packetId)

    if (!packet) {
      return left(new ResourceNotFoundError('Packet not found.'))
    }

    if (packet.status === 'RETURNED' && packet.delivererId === undefined) {
      return left(new NotAllowedError('Packet already returned.'))
    }

    packet.delivererId = undefined
    packet.status = 'RETURNED'

    await this.packetsRepository.save(packet)

    return right({
      packet,
    })
  }
}
