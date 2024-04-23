/*
  Warnings:

  - You are about to drop the `packages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_deliverer_id_fkey";

-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_destination_id_fkey";

-- DropTable
DROP TABLE "packages";

-- CreateTable
CREATE TABLE "packets" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "destination_id" TEXT NOT NULL,
    "deliverer_id" TEXT NOT NULL,

    CONSTRAINT "packets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "packets" ADD CONSTRAINT "packets_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packets" ADD CONSTRAINT "packets_deliverer_id_fkey" FOREIGN KEY ("deliverer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
