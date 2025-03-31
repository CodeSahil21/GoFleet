-- DropForeignKey
ALTER TABLE "Captain" DROP CONSTRAINT "Captain_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "Captain" ADD CONSTRAINT "Captain_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
