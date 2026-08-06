export interface TransactionManagerPort {
  run<T>(operation: () => Promise<T>): Promise<T>;
}
