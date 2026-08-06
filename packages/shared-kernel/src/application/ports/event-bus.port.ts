import type { DomainEvent } from '../../events/domain-event.js';

type EventPayload = Readonly<Record<string, unknown>>;

export interface EventBusPort {
  publish(event: DomainEvent<EventPayload>): Promise<void>;

  publishMany(events: DomainEvent<EventPayload>[]): Promise<void>;
}
