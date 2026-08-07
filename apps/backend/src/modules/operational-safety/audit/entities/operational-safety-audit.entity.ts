export class OperationalSafetyAuditEntity {
  id!: string;

  action!: string;

  previousState!: string;

  newState!: string;

  reason!: string | null;

  createdAt!: Date;
}
