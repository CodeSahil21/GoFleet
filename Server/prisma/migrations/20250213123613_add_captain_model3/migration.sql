-- DropForeignKey
ALTER TABLE "Captain" DROP CONSTRAINT "Captain_locationId_fkey";

-- AlterTable
ALTER TABLE "Captain" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Captain" ADD CONSTRAINT "Captain_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
