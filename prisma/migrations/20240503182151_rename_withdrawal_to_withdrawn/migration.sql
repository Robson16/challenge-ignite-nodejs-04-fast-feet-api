/*
  Warnings:

  - The values [WITHDRAWAL] on the enum `PacketStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PacketStatus_new" AS ENUM ('DELIVERED', 'RETURNED', 'WITHDRAWN', 'AWAITING_WITHDRAWAL');
ALTER TABLE "packets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "packets" ALTER COLUMN "status" TYPE "PacketStatus_new" USING ("status"::text::"PacketStatus_new");
ALTER TYPE "PacketStatus" RENAME TO "PacketStatus_old";
ALTER TYPE "PacketStatus_new" RENAME TO "PacketStatus";
DROP TYPE "PacketStatus_old";
ALTER TABLE "packets" ALTER COLUMN "status" SET DEFAULT 'AWAITING_WITHDRAWAL';
COMMIT;
