-- Rename columns
ALTER TABLE "packets" RENAME COLUMN "deliverer_at" TO "deliverer_id";
ALTER TABLE "packets" RENAME COLUMN "destination_at" TO "destination_id";

-- Remove old indexes
DROP INDEX "packets_deliverer_at_key";
DROP INDEX "packets_destination_at_key";

-- Create new indexes
CREATE UNIQUE INDEX "packets_deliverer_id_key" ON "packets"("deliverer_id");
CREATE UNIQUE INDEX "packets_destination_id_key" ON "packets"("destination_id");

-- Adjust foreign key for deliverer_id
ALTER TABLE "packets" DROP CONSTRAINT "packets_deliverer_at_fkey";
ALTER TABLE "packets" ADD CONSTRAINT "packets_deliverer_id_fkey" FOREIGN KEY ("deliverer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Adjust foreign key for destination_id
ALTER TABLE "packets" DROP CONSTRAINT "packets_destination_at_fkey";
ALTER TABLE "packets" ADD CONSTRAINT "packets_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
