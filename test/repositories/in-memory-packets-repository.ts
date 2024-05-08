import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  PacketsFilters,
  PacketsRepository,
} from '@/domain/order/application/repositories/packets-repository'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { InMemoryDestinationsRepository } from './in-memory-destinations-repository'

export class InMemoryPacketsRepository implements PacketsRepository {
  public items: Packet[] = []

  constructor(private destinationsRepository: InMemoryDestinationsRepository) {}

  async findById(id: string) {
    const packet = this.items.find((item) => item.id.toString() === id)

    if (!packet) {
      return null
    }

    return packet
  }

  async findAwaitingWithdrawalById(id: string) {
    const packet = this.items.find(
      (item) =>
        item.id.toString() === id && item.status === 'AWAITING_WITHDRAWAL',
    )

    if (!packet) {
      return null
    }

    return packet
  }

  async findManyAwaiting({ page }: PaginationParams) {
    const packets = this.items.slice((page - 1) * 20, page * 20)

    return packets
  }

  async findManyWithdrawnByDelivererId(
    delivererId: string,
    { page }: PaginationParams,
    filters?: PacketsFilters,
  ) {
    let packets = this.items.filter((item) => {
      if (
        item.delivererId == null ||
        item.delivererId.toString() !== delivererId ||
        item.status !== 'WITHDRAWN'
      ) {
        return false
      }

      return true
    })

    // Asynchronous filter processing
    if (filters) {
      if (filters.neighborhood || filters.city || filters.state) {
        const filteredPackets = await Promise.all(
          packets.map(async (packet) => {
            const destination = await this.destinationsRepository.findById(
              packet.destinationId.toString(),
            )

            return { packet, destination }
          }),
        )

        packets = filteredPackets
          .filter(({ destination }) =>
            destination
              ? (!filters.neighborhood ||
                  destination.addressNeighborhood === filters.neighborhood) &&
                (!filters.city || destination.addressCity === filters.city) &&
                (!filters.state || destination.addressState === filters.state)
              : false,
          )
          .map(({ packet }) => packet)
      }
    }

    const startIndex = (page - 1) * 20
    const endIndex = page * 20

    packets = packets.slice(startIndex, endIndex)

    return packets
  }

  async findManyDeliveredByDelivererId(
    delivererId: string,
    { page }: PaginationParams,
    filters?: PacketsFilters,
  ) {
    let packets = this.items.filter((item) => {
      if (
        item.delivererId == null ||
        item.delivererId.toString() !== delivererId ||
        item.status !== 'DELIVERED'
      ) {
        return false
      }

      return true
    })

    // Asynchronous filter processing
    if (filters) {
      if (filters.neighborhood || filters.city || filters.state) {
        const filteredPackets = await Promise.all(
          packets.map(async (packet) => {
            const destination = await this.destinationsRepository.findById(
              packet.destinationId.toString(),
            )

            return { packet, destination }
          }),
        )

        packets = filteredPackets
          .filter(({ destination }) =>
            destination
              ? (!filters.neighborhood ||
                  destination.addressNeighborhood === filters.neighborhood) &&
                (!filters.city || destination.addressCity === filters.city) &&
                (!filters.state || destination.addressState === filters.state)
              : false,
          )
          .map(({ packet }) => packet)
      }
    }

    const startIndex = (page - 1) * 20
    const endIndex = page * 20

    packets = packets.slice(startIndex, endIndex)

    return packets
  }

  async create(packet: Packet) {
    this.items.push(packet)
  }

  async save(packet: Packet) {
    const itemIndex = this.items.findIndex((item) => item.id === packet.id)

    this.items[itemIndex] = packet
  }
}
