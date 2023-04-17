-- DropIndex
DROP INDEX "visits_id_token_id_created_at_origin_idx";

-- CreateIndex
CREATE INDEX "visits_id_token_id_created_at_last_ping_at_ended_at_origin_idx" ON "visits"("id", "token_id", "created_at", "last_ping_at", "ended_at", "origin");
