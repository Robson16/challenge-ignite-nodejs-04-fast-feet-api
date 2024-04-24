import { Packet } from '@/domain/order/enterprise/entities/packet'

export abstract class PacketsRepository {
  abstract findById(id: string): Promise<Packet | null>
  abstract create(packet: Packet): Promise<void>
}
