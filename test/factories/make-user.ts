import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/user/enterprise/entities/user'
import { CPF } from '@/domain/user/enterprise/entities/value-objects/cpf'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
): User {
  const user = User.create(
    {
      name: faker.person.fullName(),
      cpf: CPF.generate(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'DELIVERER',
      ...override,
    },
    id,
  )

  return user
}
