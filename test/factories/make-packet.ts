import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Packet, PacketProps } from '@/domain/order/enterprise/entities/packet'

export function makePacket(
  override: Partial<PacketProps> = {},
  id?: UniqueEntityID,
): Packet {
  const packet = Packet.create(
    {
      destinationId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return packet
}
