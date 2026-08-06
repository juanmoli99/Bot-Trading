import type { UniqueId } from '../identifiers/unique-id.js';

export interface DomainEventMetadata {
  readonly eventId: UniqueId;
  readonly correlationId: UniqueId;
  readonly occurredAt: Date;
  readonly eventName: string;
  readonly aggregateId: UniqueId;
}

export interface DomainEvent<
  TPayload extends Readonly<Record<string, unknown>>,
> {
  readonly metadata: DomainEventMetadata;
  readonly payload: TPayload;
}