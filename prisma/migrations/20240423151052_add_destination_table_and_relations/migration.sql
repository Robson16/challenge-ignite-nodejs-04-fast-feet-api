/*
  Warnings:

  - Added the required column `deliverer_id` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_id` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'RECIPIENT';

-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "deliverer_id" TEXT NOT NULL,
ADD COLUMN     "destination_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "destinations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "recipient_id" TEXT NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_deliverer_id_fkey" FOREIGN KEY ("deliverer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
