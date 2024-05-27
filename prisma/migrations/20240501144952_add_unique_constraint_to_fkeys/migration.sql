/*
  Warnings:

  - You are about to drop the column `deliverer_id` on the `packets` table. All the data in the column will be lost.
  - You are about to drop the column `destination_id` on the `packets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recipient_id]` on the table `destinations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deliverer_at]` on the table `packets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destination_at]` on the table `packets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destination_at` to the `packets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "packets" DROP CONSTRAINT "packets_deliverer_id_fkey";

-- DropForeignKey
ALTER TABLE "packets" DROP CONSTRAINT "packets_destination_id_fkey";

-- AlterTable
ALTER TABLE "packets" DROP COLUMN "deliverer_id",
DROP COLUMN "destination_id",
ADD COLUMN     "deliverer_at" TEXT,
ADD COLUMN     "destination_at" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "destinations_recipient_id_key" ON "destinations"("recipient_id");

-- CreateIndex
CREATE UNIQUE INDEX "packets_deliverer_at_key" ON "packets"("deliverer_at");

-- CreateIndex
CREATE UNIQUE INDEX "packets_destination_at_key" ON "packets"("destination_at");

-- AddForeignKey
ALTER TABLE "packets" ADD CONSTRAINT "packets_deliverer_at_fkey" FOREIGN KEY ("deliverer_at") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packets" ADD CONSTRAINT "packets_destination_at_fkey" FOREIGN KEY ("destination_at") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
