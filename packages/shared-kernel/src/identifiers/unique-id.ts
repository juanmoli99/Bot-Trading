import { randomUUID } from 'node:crypto';
import { ValueObject } from '../value-objects/value-object.js';

interface UniqueIdProperties {
  readonly value: string;
}

export class UniqueId extends ValueObject<UniqueIdProperties> {
  private constructor(value: string) {
    super({ value });
  }

  static create(value?: string): UniqueId {
    const normalizedValue = value?.trim() ?? randomUUID();

    if (normalizedValue.length === 0) {
      throw new Error('El identificador Ãºnico no puede estar vacÃ­o.');
    }

    return new UniqueId(normalizedValue);
  }

  get value(): string {
    return this.properties.value;
  }

  override toString(): string {
    return this.value;
  }
}
