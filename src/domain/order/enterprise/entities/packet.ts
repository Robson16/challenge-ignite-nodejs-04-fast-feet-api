import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PacketProps {
  destinationId: UniqueEntityID
  delivererId: UniqueEntityID
  status: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Packet extends Entity<PacketProps> {
  get destinationId() {
    return this.props.destinationId
  }

  get delivererId() {
    return this.props.delivererId
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<PacketProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const packet = new Packet(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return packet
  }
}
