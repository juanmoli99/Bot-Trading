export type ResultState<TValue, TError> =
  | {
      readonly success: true;
      readonly value: TValue;
    }
  | {
      readonly success: false;
      readonly error: TError;
    };

export class Result<TValue, TError> {
  private constructor(private readonly state: ResultState<TValue, TError>) {}

  static success<TValue, TError = never>(
    value: TValue,
  ): Result<TValue, TError> {
    return new Result<TValue, TError>({
      success: true,
      value,
    });
  }

  static failure<TValue = never, TError = unknown>(
    error: TError,
  ): Result<TValue, TError> {
    return new Result<TValue, TError>({
      success: false,
      error,
    });
  }

  isSuccess(): this is Result<TValue, TError> & {
    state: {
      readonly success: true;
      readonly value: TValue;
    };
  } {
    return this.state.success;
  }

  isFailure(): this is Result<TValue, TError> & {
    state: {
      readonly success: false;
      readonly error: TError;
    };
  } {
    return !this.state.success;
  }

  getValue(): TValue {
    if (!this.state.success) {
      throw new Error('No se puede obtener el valor de un resultado fallido.');
    }

    return this.state.value;
  }

  getError(): TError {
    if (this.state.success) {
      throw new Error('No se puede obtener el error de un resultado exitoso.');
    }

    return this.state.error;
  }

  map<TMappedValue>(
    mapper: (value: TValue) => TMappedValue,
  ): Result<TMappedValue, TError> {
    if (!this.state.success) {
      return Result.failure<TMappedValue, TError>(this.state.error);
    }

    return Result.success<TMappedValue, TError>(mapper(this.state.value));
  }

  mapError<TMappedError>(
    mapper: (error: TError) => TMappedError,
  ): Result<TValue, TMappedError> {
    if (this.state.success) {
      return Result.success<TValue, TMappedError>(this.state.value);
    }

    return Result.failure<TValue, TMappedError>(mapper(this.state.error));
  }

  match<TResult>(handlers: {
    readonly success: (value: TValue) => TResult;
    readonly failure: (error: TError) => TResult;
  }): TResult {
    if (this.state.success) {
      return handlers.success(this.state.value);
    }

    return handlers.failure(this.state.error);
  }
}
