-- CreateIndex
CREATE INDEX "tokens_user_id_token_idx" ON "tokens"("user_id", "token");

-- CreateIndex
CREATE INDEX "visits_id_token_id_created_at_origin_idx" ON "visits"("id", "token_id", "created_at", "origin");
