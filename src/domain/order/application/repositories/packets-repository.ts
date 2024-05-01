import { Packet } from '@/domain/order/enterprise/entities/packet'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class PacketsRepository {
  abstract findById(id: string): Promise<Packet | null>
  abstract findManyAwaiting(params: PaginationParams): Promise<Packet[]>
  abstract create(packet: Packet): Promise<void>
}
