import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makePacket } from 'test/factories/make-packet'
import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { InMemoryPacketsRepository } from 'test/repositories/in-memory-packets-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DefinePacketAsAwaitingWithdrawalUseCase } from './define-packet-as-awaiting-withdrawal'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let inMemoryPacketsRepository: InMemoryPacketsRepository
let sut: DefinePacketAsAwaitingWithdrawalUseCase // Subject Under Test

describe('Define Packet as Awaiting Withdrawal', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    inMemoryPacketsRepository = new InMemoryPacketsRepository(
      inMemoryUsersRepository,
      inMemoryDestinationsRepository,
    )
    sut = new DefinePacketAsAwaitingWithdrawalUseCase(inMemoryPacketsRepository)
  })

  it('should be able to define packet as awaiting withdrawal', async () => {
    const packet = makePacket({
      status: 'WITHDRAWN',
    })

    await inMemoryPacketsRepository.create(packet)

    const result = await sut.execute({
      packetId: packet.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPacketsRepository.items[0]).toMatchObject({
      delivererId: undefined,
      status: 'AWAITING_WITHDRAWAL',
    })
  })

  it('should not be able to define a non existing packet as awaiting withdrawal', async () => {
    const result = await sut.execute({
      packetId: 'non-existing-packet-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to define a packet as awaiting withdrawal that already is defined as it', async () => {
    const packet = makePacket({
      delivererId: undefined,
      status: 'AWAITING_WITHDRAWAL',
    })

    await inMemoryPacketsRepository.create(packet)

    const result = await sut.execute({
      packetId: packet.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
