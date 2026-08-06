import { UniqueId } from '../identifiers/unique-id.js';

export abstract class Entity<TProperties> {
  protected readonly properties: TProperties;
  readonly id: UniqueId;

  protected constructor(
    properties: TProperties,
    id?: UniqueId,
  ) {
    this.properties = properties;
    this.id = id ?? UniqueId.create();
  }

  equals(other: Entity<TProperties> | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (other.constructor !== this.constructor) {
      return false;
    }

    return this.id.equals(other.id);
  }
}