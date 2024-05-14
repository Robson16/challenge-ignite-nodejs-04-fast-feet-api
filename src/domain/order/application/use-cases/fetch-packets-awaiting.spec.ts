import { makePacket } from 'test/factories/make-packet'
import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { InMemoryPacketsRepository } from 'test/repositories/in-memory-packets-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FetchPacketsAwaitingUseCase } from './fetch-packets-awaiting'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let inMemoryPacketsRepository: InMemoryPacketsRepository
let sut: FetchPacketsAwaitingUseCase // Subject Under Test

describe('Fetch Packets Awaiting', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    inMemoryPacketsRepository = new InMemoryPacketsRepository(
      inMemoryUsersRepository,
      inMemoryDestinationsRepository,
    )
    sut = new FetchPacketsAwaitingUseCase(inMemoryPacketsRepository)
  })

  it('should be able to fetch packets', async () => {
    await inMemoryPacketsRepository.create(
      makePacket({ status: 'AWAITING_WITHDRAWAL' }),
    )
    await inMemoryPacketsRepository.create(
      makePacket({ status: 'AWAITING_WITHDRAWAL' }),
    )
    await inMemoryPacketsRepository.create(
      makePacket({ status: 'AWAITING_WITHDRAWAL' }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.packets).toHaveLength(3)
  })

  it('should be able to fetch paginated packets', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPacketsRepository.create(
        makePacket({ status: 'AWAITING_WITHDRAWAL' }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.packets).toHaveLength(2)
  })
})
