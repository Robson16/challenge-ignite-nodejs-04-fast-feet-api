import { PaginationParams } from '@/core/repositories/pagination-params'
import { PacketsRepository } from '@/domain/order/application/repositories/packets-repository'
import { Packet } from '@/domain/order/enterprise/entities/packet'

export class InMemoryPacketsRepository implements PacketsRepository {
  public items: Packet[] = []

  async findById(id: string) {
    const packet = this.items.find((item) => item.id.toString() === id)

    if (!packet) {
      return null
    }

    return packet
  }

  async findManyAwaiting({ page }: PaginationParams) {
    const packets = this.items.slice((page - 1) * 20, page * 20)

    return packets
  }

  async create(packet: Packet) {
    this.items.push(packet)
  }
}
