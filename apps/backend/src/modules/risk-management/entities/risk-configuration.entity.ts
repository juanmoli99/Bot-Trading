export class RiskConfigurationEntity {
  id!: string;

  maxDailyLoss!: string;

  maxTotalExposure!: string;

  maxOpenPositions!: number;

  createdAt!: Date;

  updatedAt!: Date;
}
