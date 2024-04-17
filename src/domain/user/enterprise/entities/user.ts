import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { CPF } from './value-objects/cpf'

export type UserRole = 'ADMIN' | 'DELIVERER'

export interface UserProps {
  name: string
  cpf: CPF
  email: string
  password: string
  role?: UserRole
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  static create(props: Optional<UserProps, 'role'>, id?: UniqueEntityID) {
    const user = new User({ ...props, role: props.role ?? 'DELIVERER' }, id)

    return user
  }
}
