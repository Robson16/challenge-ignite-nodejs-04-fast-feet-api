import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDestination } from 'test/factories/make-destination'
import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { GetDestinationUseCase } from './get-destination'
import { EditDestinationUseCase } from './edit-destination'
import { faker } from '@faker-js/faker'

let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let sut: EditDestinationUseCase // Subject Under Test

describe('Edit Destination', () => {
  beforeEach(() => {
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    sut = new EditDestinationUseCase(inMemoryDestinationsRepository)
  })

  it('should be able to edit a destination', async () => {
    const destination = makeDestination()

    await inMemoryDestinationsRepository.create(destination)

    const result = await sut.execute({
      destinationId: destination.id.toString(),
      title: faker.lorem.word(),
      addressStreet: faker.location.street(),
      addressNumber: faker.number.int({ min: 1, max: 9999 }).toString(),
      addressComplement: faker.location.secondaryAddress(),
      addressZipCode: faker.location.zipCode(),
      addressNeighborhood: faker.location.county(),
      addressCity: faker.location.city(),
      addressState: faker.location.state(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      destination: expect.objectContaining({
        updatedAt: expect.any(Date),
      }),
    })
    expect(inMemoryDestinationsRepository.items[0].updatedAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to edit a non-existing destination', async () => {
    const result = await sut.execute({
      destinationId: 'non-existing-destination-id',
      title: faker.lorem.word(),
      addressStreet: faker.location.street(),
      addressNumber: faker.number.int({ min: 1, max: 9999 }).toString(),
      addressComplement: faker.location.secondaryAddress(),
      addressZipCode: faker.location.zipCode(),
      addressNeighborhood: faker.location.county(),
      addressCity: faker.location.city(),
      addressState: faker.location.state(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
