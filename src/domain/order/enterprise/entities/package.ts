import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PackageProps {
  destinationId: UniqueEntityID
  delivererId: UniqueEntityID
  status: string
}

export class Package extends Entity<PackageProps> {
  get destinationId() {
    return this.props.destinationId
  }

  get delivererId() {
    return this.props.delivererId
  }

  get status() {
    return this.props.status
  }

  static create(props: PackageProps, id?: UniqueEntityID) {
    const packet = new Package({ ...props }, id)

    return packet
  }
}
