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

  async create(packet: Packet) {
    this.items.push(packet)
  }
}
