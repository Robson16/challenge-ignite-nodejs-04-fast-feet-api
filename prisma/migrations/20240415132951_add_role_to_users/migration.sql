-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DELIVERER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'DELIVERER';
