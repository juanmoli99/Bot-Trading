-- CreateTable
CREATE TABLE "EquityHistory" (
    "id" TEXT NOT NULL,
    "equity" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquityHistory_pkey" PRIMARY KEY ("id")
);
