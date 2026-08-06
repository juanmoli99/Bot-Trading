export { AggregateRoot } from './entities/aggregate-root.js';
export { Entity } from './entities/entity.js';

export type {
  DomainEvent,
  DomainEventMetadata,
} from './events/domain-event.js';

export {
  DomainException,
} from './exceptions/domain-exception.js';
export type {
  DomainExceptionOptions,
} from './exceptions/domain-exception.js';

export { UniqueId } from './identifiers/unique-id.js';

export { Result } from './results/result.js';
export type {
  ResultState,
} from './results/result.js';

export { ValueObject } from './value-objects/value-object.js';