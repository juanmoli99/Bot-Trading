-- CreateTable
CREATE TABLE "RiskConfiguration" (
    "id" TEXT NOT NULL,
    "maxDailyLoss" TEXT NOT NULL,
    "maxTotalExposure" TEXT NOT NULL,
    "maxOpenPositions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskConfiguration_pkey" PRIMARY KEY ("id")
);
