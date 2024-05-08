import { Packet } from '@/domain/order/enterprise/entities/packet'
import { PaginationParams } from '@/core/repositories/pagination-params'

export interface PacketsFilters {
  state?: string
  city?: string
  neighborhood?: string
}

export abstract class PacketsRepository {
  abstract findById(id: string): Promise<Packet | null>
  abstract findAwaitingWithdrawalById(id: string): Promise<Packet | null>
  abstract findManyAwaiting(pagination: PaginationParams): Promise<Packet[]>

  abstract findManyWithdrawnByDelivererId(
    delivererId: string,
    pagination: PaginationParams,
    filters?: PacketsFilters,
  ): Promise<Packet[]>

  abstract findManyDeliveredByDelivererId(
    delivererId: string,
    pagination: PaginationParams,
    filters?: PacketsFilters,
  ): Promise<Packet[]>

  abstract create(packet: Packet): Promise<void>
  abstract save(packet: Packet): Promise<void>
}
