-- CreateTable
CREATE TABLE "sites" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "favicon_url" TEXT,
    "hostname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sites_hostname_id_idx" ON "sites"("hostname", "id");
