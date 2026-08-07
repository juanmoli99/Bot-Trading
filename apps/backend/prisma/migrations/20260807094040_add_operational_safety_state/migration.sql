-- CreateTable
CREATE TABLE "OperationalSafetyState" (
    "id" TEXT NOT NULL,
    "tradingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "killSwitchActive" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "environment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationalSafetyState_pkey" PRIMARY KEY ("id")
);
