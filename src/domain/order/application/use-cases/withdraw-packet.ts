import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { PacketsRepository } from '@/domain/order/application/repositories/packets-repository'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { UnavailablePacketError } from './errors/unavailable-packet-error'

interface WithdrawalPacketUseCaseRequest {
  delivererId: string
  packetId: string
}

type WithdrawalPacketUseCaseResponse = Either<
  ResourceNotFoundError | UnavailablePacketError,
  {
    packet: Packet
  }
>

@Injectable()
export class WithdrawalPacketUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private packetsRepository: PacketsRepository,
  ) {}

  async execute({
    delivererId,
    packetId,
  }: WithdrawalPacketUseCaseRequest): Promise<WithdrawalPacketUseCaseResponse> {
    const deliverer = await this.usersRepository.findById(delivererId)

    if (!deliverer) {
      return left(new ResourceNotFoundError())
    }

    const packet =
      await this.packetsRepository.findAwaitingWithdrawalById(packetId)

    if (!packet) {
      return left(new UnavailablePacketError())
    }

    packet.delivererId = new UniqueEntityID(delivererId)
    packet.status = 'WITHDRAWN'

    this.packetsRepository.save(packet)

    return right({
      packet,
    })
  }
}
