import { Either, right } from '@/core/either'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { Injectable } from '@nestjs/common'
import { PacketsRepository } from '../repositories/packets-repository'

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
    const packets = await this.packetsRepository.findManyAwaiting({ page })

    return right({
      packets,
    })
  }
}
