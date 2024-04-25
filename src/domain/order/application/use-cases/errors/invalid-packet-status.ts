import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidPacketStatus extends Error implements UseCaseError {
  constructor(status: string) {
    super(`Packet status ${status} is invalid.`)
  }
}
