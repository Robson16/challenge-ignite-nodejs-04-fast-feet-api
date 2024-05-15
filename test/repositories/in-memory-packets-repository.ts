import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  PacketsFilters,
  PacketsRepository,
} from '@/domain/order/application/repositories/packets-repository'
import { Packet } from '@/domain/order/enterprise/entities/packet'
import { PacketDetails } from '@/domain/order/enterprise/entities/value-objects/packet-details'
import { InMemoryDestinationsRepository } from './in-memory-destinations-repository'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryPacketsRepository implements PacketsRepository {
  public items: Packet[] = []

  constructor(
    private usersRepository: InMemoryUsersRepository,
    private destinationsRepository: InMemoryDestinationsRepository,
  ) {}

  async findById(id: string) {
    const packet = this.items.find((item) => item.id.toString() === id)

    if (!packet) {
      return null
    }

    return packet
  }

  async findDetailsById(id: string) {
    const packet = this.items.find((item) => item.id.toString() === id)

    if (!packet) {
      return null
    }

    const destination = await this.destinationsRepository.findById(
      packet.destinationId.toString(),
    )

    if (!destination) {
      throw new Error(
        `Destination with ID "${packet.destinationId.toString()}" does not exist.`,
      )
    }

    const recipient = await this.usersRepository.findById(
      destination.recipientId.toString(),
    )

    if (!recipient) {
      throw new Error(
        `Recipient with ID "${destination.recipientId.toString()}" does not exist.`,
      )
    }

    return PacketDetails.create({
      packetId: packet.id,
      destinationId: packet.destinationId,
      recipient: recipient.name,
      addressStreet: destination.addressStreet,
      addressNumber: destination.addressNumber,
      addressComplement: destination.addressComplement,
      addressZipCode: destination.addressZipCode,
      addressNeighborhood: destination.addressNeighborhood,
      addressCity: destination.addressCity,
      addressState: destination.addressState,
      addressCountry: destination.addressCountry,
      status: packet.status,
      createdAt: packet.createdAt,
      updatedAt: packet.updatedAt,
    })
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
    const packets = this.items
      .filter((item) => item.status === 'AWAITING_WITHDRAWAL')
      .slice((page - 1) * 20, page * 20)

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

    if (itemIndex !== -1) {
      this.items[itemIndex] = packet
    }
  }

  async delete(packet: Packet) {
    const itemIndex = this.items.findIndex((item) => item.id === packet.id)

    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1)
    }
  }
}
