-- DropIndex
DROP INDEX "bloodReport_userId_key";

-- DropIndex
DROP INDEX "liverReport_userId_key";

-- AlterTable
ALTER TABLE "bloodReport" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "bloodReport_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "liverReport" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "liverReport_pkey" PRIMARY KEY ("id");
