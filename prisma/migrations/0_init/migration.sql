-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "login" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 3,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "creatorId" TEXT,
    "city" TEXT NOT NULL DEFAULT '',
    "feePerkwForCompany" INTEGER NOT NULL DEFAULT 0,
    "feePerkwHeatPump" INTEGER NOT NULL DEFAULT 0,
    "feePerkwPhotovoltaic" INTEGER NOT NULL DEFAULT 0,
    "imposedFeeForCompany" INTEGER NOT NULL DEFAULT 0,
    "imposedFeeHeatPump" INTEGER NOT NULL DEFAULT 0,
    "imposedFeePhotovoltaic" INTEGER NOT NULL DEFAULT 0,
    "feePerkwHeatHome" INTEGER NOT NULL DEFAULT 0,
    "imposedFeeHeatHome" INTEGER NOT NULL DEFAULT 0,
    "imposedFeeAirCondition" INTEGER NOT NULL DEFAULT 0,
    "imposedFeeTurbines" INTEGER NOT NULL DEFAULT 0,
    "feePerkwTurbines" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photovoltaic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "panels_small" JSONB NOT NULL,
    "panels_medium" JSONB NOT NULL,
    "panels_large" JSONB NOT NULL,
    "addons" JSONB NOT NULL,
    "dotations" JSONB NOT NULL,
    "boilers" JSONB NOT NULL,
    "energyStore" JSONB NOT NULL,
    "carPort" JSONB NOT NULL,
    "creditPercentage" DOUBLE PRECISION NOT NULL,
    "electricityPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Photovoltaic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turbines" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "turbines" JSONB NOT NULL,
    "addons" JSONB NOT NULL,
    "energyStore" JSONB NOT NULL,

    CONSTRAINT "Turbines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirCondition" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "airConditioners" JSONB NOT NULL,
    "addons" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AirCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatPump" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "heatPumps" JSONB NOT NULL,
    "bufory" JSONB NOT NULL,
    "addons" JSONB NOT NULL,
    "dotations" JSONB NOT NULL,
    "electricityPrice" DOUBLE PRECISION NOT NULL,
    "cop" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeatPump_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE INDEX "User_creatorId_idx" ON "User"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Photovoltaic_userId_key" ON "Photovoltaic"("userId");

-- CreateIndex
CREATE INDEX "Photovoltaic_userId_idx" ON "Photovoltaic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Turbines_userId_key" ON "Turbines"("userId");

-- CreateIndex
CREATE INDEX "Turbines_userId_idx" ON "Turbines"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AirCondition_userId_key" ON "AirCondition"("userId");

-- CreateIndex
CREATE INDEX "AirCondition_userId_idx" ON "AirCondition"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HeatPump_userId_key" ON "HeatPump"("userId");

-- CreateIndex
CREATE INDEX "HeatPump_userId_idx" ON "HeatPump"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

