import { Either, right } from '@/core/either'
import { PacketsRepository } from '@/domain/order/application/repositories/packets-repository'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { Injectable } from '@nestjs/common'

interface FetchPacketsAwaitingUseCaseRequest {
  page: number
}

type FetchPacketsAwaitingUseCaseResponse = Either<
  null,
  {
    packets: Packet[]
  }
>

@Injectable()
export class FetchPacketsAwaitingUseCase {
  constructor(private packetsRepository: PacketsRepository) {}

  async execute({
    page,
  }: FetchPacketsAwaitingUseCaseRequest): Promise<FetchPacketsAwaitingUseCaseResponse> {
    const packets = await this.packetsRepository.findManyByStatus(
      'AWAITING_WITHDRAWAL',
      { page },
    )

    return right({
      packets,
    })
  }
}
