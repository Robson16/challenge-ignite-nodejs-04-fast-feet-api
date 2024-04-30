/*
  Warnings:

  - The `status` column on the `packets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PacketStatus" AS ENUM ('DELIVERED', 'RETURNED', 'WITHDRAWAL', 'AWAITING_WITHDRAWAL');

-- AlterTable
ALTER TABLE "packets" DROP COLUMN "status",
ADD COLUMN     "status" "PacketStatus" NOT NULL DEFAULT 'AWAITING_WITHDRAWAL';
