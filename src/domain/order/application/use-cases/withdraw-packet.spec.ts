import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makePacket } from 'test/factories/make-packet'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { InMemoryPacketsRepository } from 'test/repositories/in-memory-packets-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UnavailablePacketError } from './errors/unavailable-packet-error'
import { WithdrawalPacketUseCase } from './withdraw-packet'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let inMemoryPacketsRepository: InMemoryPacketsRepository
let sut: WithdrawalPacketUseCase // Subject Under Test

describe('Withdrawal Packet', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    inMemoryPacketsRepository = new InMemoryPacketsRepository(
      inMemoryUsersRepository,
      inMemoryDestinationsRepository,
    )
    sut = new WithdrawalPacketUseCase(
      inMemoryUsersRepository,
      inMemoryPacketsRepository,
    )
  })

  it('should be able to withdrawal a packet', async () => {
    const deliverer = makeUser()
    const packet = makePacket()

    await inMemoryUsersRepository.create(deliverer)
    await inMemoryPacketsRepository.create(packet)

    const result = await sut.execute({
      delivererId: deliverer.id.toString(),
      packetId: packet.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPacketsRepository.items[0]).toMatchObject({
      status: 'WITHDRAWN',
    })
  })

  it('should not be able to withdrawal with a invalid deliverer', async () => {
    const packet = makePacket()

    await inMemoryPacketsRepository.create(packet)

    const result = await sut.execute({
      delivererId: 'invalid-deliverer-id',
      packetId: packet.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to withdrawal an unavailable packet', async () => {
    const deliverer = makeUser()
    const packet = makePacket({
      status: 'DELIVERED',
    })

    await inMemoryUsersRepository.create(deliverer)
    await inMemoryPacketsRepository.create(packet)

    const result = await sut.execute({
      delivererId: deliverer.id.toString(),
      packetId: packet.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnavailablePacketError)
  })
})
