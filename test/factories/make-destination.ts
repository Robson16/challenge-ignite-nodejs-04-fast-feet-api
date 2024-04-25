import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Destination,
  DestinationProps,
} from '@/domain/order/enterprise/entities/destination'
import { faker } from '@faker-js/faker'

export function makeDestination(
  override: Partial<DestinationProps> = {},
  id?: UniqueEntityID,
): Destination {
  const destination = Destination.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.word(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return destination
}
