export class OperationalSafetyEntity {
  id!: string;

  tradingEnabled!: boolean;

  killSwitchActive!: boolean;

  reason!: string | null;

  environment!: string;

  liveTradingAllowed!: boolean;

  createdAt!: Date;

  updatedAt!: Date;
}
