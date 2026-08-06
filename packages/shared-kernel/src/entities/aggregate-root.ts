import type { DomainEvent } from '../events/domain-event.js';
import { Entity } from './entity.js';

type AnyDomainEvent = DomainEvent<Readonly<Record<string, unknown>>>;

export abstract class AggregateRoot<TProperties> extends Entity<TProperties> {
  private readonly domainEvents: AnyDomainEvent[] = [];

  protected addDomainEvent(event: AnyDomainEvent): void {
    this.domainEvents.push(event);
  }

  getDomainEvents(): readonly AnyDomainEvent[] {
    return [...this.domainEvents];
  }

  clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }

  pullDomainEvents(): readonly AnyDomainEvent[] {
    const events = [...this.domainEvents];

    this.clearDomainEvents();

    return events;
  }
}
