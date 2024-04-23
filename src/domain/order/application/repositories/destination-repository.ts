import { Destination } from '@/domain/order/enterprise/entities/destination'

export abstract class DestinationRepository {
  abstract create(destination: Destination): Promise<void>
}
