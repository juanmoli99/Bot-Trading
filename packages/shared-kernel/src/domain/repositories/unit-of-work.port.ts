import type { TransactionManagerPort } from '../../application/ports/transaction-manager.port.js';

export interface UnitOfWorkPort extends TransactionManagerPort {
  commit(): Promise<void>;

  rollback(): Promise<void>;
}
