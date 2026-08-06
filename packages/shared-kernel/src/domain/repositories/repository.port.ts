export interface RepositoryPort<TEntity> {
  findById(id: string): Promise<TEntity | null>;

  save(entity: TEntity): Promise<void>;

  delete(entity: TEntity): Promise<void>;
}
