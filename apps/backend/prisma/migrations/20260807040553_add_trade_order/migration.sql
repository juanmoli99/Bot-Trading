-- CreateTable
CREATE TABLE "TradeOrder" (
    "id" TEXT NOT NULL,
    "clientOrderId" TEXT NOT NULL,
    "alpacaOrderId" TEXT,
    "symbol" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timeInForce" TEXT NOT NULL,
    "qty" TEXT,
    "notional" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeOrder_clientOrderId_key" ON "TradeOrder"("clientOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "TradeOrder_alpacaOrderId_key" ON "TradeOrder"("alpacaOrderId");
