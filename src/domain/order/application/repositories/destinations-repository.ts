import { Destination } from '@/domain/order/enterprise/entities/destination'

export abstract class DestinationsRepository {
  abstract findById(id: string): Promise<Destination | null>
  abstract save(destination: Destination): Promise<void>
  abstract create(destination: Destination): Promise<void>
}
