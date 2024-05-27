/*
  Warnings:

  - Added the required column `address_city` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_complement` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_neighborhood` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_state` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_street` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_zip_code` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destinations" ADD COLUMN     "address_city" TEXT NOT NULL,
ADD COLUMN     "address_complement" TEXT NOT NULL,
ADD COLUMN     "address_country" TEXT NOT NULL DEFAULT 'Brazil',
ADD COLUMN     "address_neighborhood" TEXT NOT NULL,
ADD COLUMN     "address_number" TEXT NOT NULL,
ADD COLUMN     "address_state" TEXT NOT NULL,
ADD COLUMN     "address_street" TEXT NOT NULL,
ADD COLUMN     "address_zip_code" TEXT NOT NULL;
