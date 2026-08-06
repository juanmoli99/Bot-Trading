export interface UseCasePort<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
