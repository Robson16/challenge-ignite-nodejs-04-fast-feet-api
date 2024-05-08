import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { PacketsRepository } from '@/domain/order/application/repositories/packets-repository'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { Injectable } from '@nestjs/common'

interface DefinePacketAsAwaitingWithdrawalUseCaseRequest {
  packetId: string
}

type DefinePacketAsAwaitingWithdrawalUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    packet: Packet
  }
>

@Injectable()
export class DefinePacketAsAwaitingWithdrawalUseCase {
  constructor(private packetsRepository: PacketsRepository) {}

  async execute({
    packetId,
  }: DefinePacketAsAwaitingWithdrawalUseCaseRequest): Promise<DefinePacketAsAwaitingWithdrawalUseCaseResponse> {
    const packet = await this.packetsRepository.findById(packetId)

    if (!packet) {
      return left(new ResourceNotFoundError('Packet not found.'))
    }

    if (
      packet.status === 'AWAITING_WITHDRAWAL' &&
      packet.delivererId === undefined
    ) {
      return right({
        packet,
      })
    }

    packet.delivererId = undefined
    packet.status = 'AWAITING_WITHDRAWAL'

    await this.packetsRepository.save(packet)

    return right({
      packet,
    })
  }
}
