-- CreateTable
CREATE TABLE "OperationalSafetyAudit" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "previousState" TEXT NOT NULL,
    "newState" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OperationalSafetyAudit_pkey" PRIMARY KEY ("id")
);
