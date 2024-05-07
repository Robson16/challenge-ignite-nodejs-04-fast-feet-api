import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DestinationProps {
  recipientId: UniqueEntityID
  title: string
  addressStreet: string
  addressNumber: string
  addressComplement: string
  addressZipCode: string
  addressNeighborhood: string
  addressCity: string
  addressState: string
  addressCountry?: string
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

  get addressStreet() {
    return this.props.addressStreet
  }

  get addressNumber() {
    return this.props.addressNumber
  }

  get addressComplement() {
    return this.props.addressComplement
  }

  get addressZipCode() {
    return this.props.addressZipCode
  }

  get addressNeighborhood() {
    return this.props.addressNeighborhood
  }

  get addressCity() {
    return this.props.addressCity
  }

  get addressState() {
    return this.props.addressState
  }

  get addressCountry() {
    return this.props.addressCountry
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
    props: Optional<DestinationProps, 'addressCountry' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const destination = new Destination(
      {
        ...props,
        addressCountry: props.addressCountry ?? 'Brazil',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return destination
  }
}
