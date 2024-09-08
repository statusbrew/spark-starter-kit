-- CreateTable
CREATE TABLE "bloodReport" (
    "userId" INTEGER NOT NULL,
    "reportDate" TEXT NOT NULL,
    "hemoglobin" DECIMAL(65,30) NOT NULL,
    "packedCellVolume" DECIMAL(65,30) NOT NULL,
    "rbcCount" DECIMAL(65,30) NOT NULL,
    "mcv" DECIMAL(65,30) NOT NULL,
    "lymphocytesDiff" DECIMAL(65,30) NOT NULL,
    "neutrophils" DECIMAL(65,30) NOT NULL,
    "lymphocytes" DECIMAL(65,30) NOT NULL,
    "monocytes" DECIMAL(65,30) NOT NULL,
    "summary" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "liverReport" (
    "userId" INTEGER NOT NULL,
    "reportDate" TEXT NOT NULL,
    "SGPT" DECIMAL(65,30) NOT NULL,
    "SGOT" DECIMAL(65,30) NOT NULL,
    "GGTP" DECIMAL(65,30) NOT NULL,
    "Albumin" DECIMAL(65,30) NOT NULL,
    "Protein" DECIMAL(65,30) NOT NULL,
    "Globulin" DECIMAL(65,30) NOT NULL,
    "summary" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "bloodReport_userId_key" ON "bloodReport"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "liverReport_userId_key" ON "liverReport"("userId");

-- AddForeignKey
ALTER TABLE "bloodReport" ADD CONSTRAINT "bloodReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liverReport" ADD CONSTRAINT "liverReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
