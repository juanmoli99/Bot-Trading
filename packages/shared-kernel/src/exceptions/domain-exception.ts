export interface DomainExceptionOptions {
  readonly code: string;
  readonly details?: Readonly<Record<string, unknown>>;
  readonly cause?: unknown;
}

export abstract class DomainException extends Error {
  readonly code: string;
  readonly details: Readonly<Record<string, unknown>> | undefined;

  protected constructor(
    message: string,
    options: DomainExceptionOptions,
  ) {
    super(message, {
      cause: options.cause,
    });

    this.name = new.target.name;
    this.code = options.code;
    this.details = options.details
      ? Object.freeze({ ...options.details })
      : undefined;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}