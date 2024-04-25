import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DestinationProps {
  recipientId: UniqueEntityID
  title: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Destination extends Entity<DestinationProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<DestinationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const destination = new Destination(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return destination
  }
}
