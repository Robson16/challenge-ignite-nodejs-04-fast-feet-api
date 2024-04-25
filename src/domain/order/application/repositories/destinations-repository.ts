import { Destination } from '@/domain/order/enterprise/entities/destination'

export abstract class DestinationsRepository {
  abstract findById(id: string): Promise<Destination | null>
  abstract create(destination: Destination): Promise<void>
}
