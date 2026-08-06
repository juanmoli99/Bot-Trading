export abstract class ValueObject<TProperties extends object> {
  protected readonly properties: Readonly<TProperties>;

  protected constructor(properties: TProperties) {
    this.properties = Object.freeze({ ...properties });
  }

  equals(other: ValueObject<TProperties> | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (other.constructor !== this.constructor) {
      return false;
    }

    return ValueObject.areEqual(this.properties, other.properties);
  }

  protected getProperties(): Readonly<TProperties> {
    return this.properties;
  }

  private static areEqual(first: unknown, second: unknown): boolean {
    if (Object.is(first, second)) {
      return true;
    }

    if (
      typeof first !== 'object' ||
      first === null ||
      typeof second !== 'object' ||
      second === null
    ) {
      return false;
    }

    if (Array.isArray(first) || Array.isArray(second)) {
      if (!Array.isArray(first) || !Array.isArray(second)) {
        return false;
      }

      if (first.length !== second.length) {
        return false;
      }

      return first.every((value, index) =>
        ValueObject.areEqual(value, second[index]),
      );
    }

    const firstRecord = first as Record<string, unknown>;
    const secondRecord = second as Record<string, unknown>;

    const firstKeys = Object.keys(firstRecord);
    const secondKeys = Object.keys(secondRecord);

    if (firstKeys.length !== secondKeys.length) {
      return false;
    }

    return firstKeys.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(secondRecord, key) &&
        ValueObject.areEqual(firstRecord[key], secondRecord[key]),
    );
  }
}
