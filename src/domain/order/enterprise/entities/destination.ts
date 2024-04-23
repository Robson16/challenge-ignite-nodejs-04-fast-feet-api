import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DestinationProps {
  recipientId: UniqueEntityID
  title: string
  latitude: number
  longitude: number
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

  static create(props: DestinationProps, id?: UniqueEntityID) {
    const destination = new Destination({ ...props }, id)

    return destination
  }
}
