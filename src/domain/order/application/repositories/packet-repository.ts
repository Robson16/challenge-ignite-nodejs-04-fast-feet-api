import { Packet } from '@/domain/order/enterprise/entities/packet'

export abstract class PacketRepository {
  abstract create(packet: Packet): Promise<void>
}
