-- CreateTable
CREATE TABLE "CVE" (
    "id" SERIAL NOT NULL,
    "cve_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "last_modified" TIMESTAMP(3) NOT NULL,
    "score" DOUBLE PRECISION,
    "severity" TEXT,
    "exploitabilityScore" DOUBLE PRECISION,
    "impactScore" DOUBLE PRECISION,

    CONSTRAINT "CVE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPE" (
    "id" SERIAL NOT NULL,
    "cve_id" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "vulnerable" BOOLEAN NOT NULL,

    CONSTRAINT "CPE_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CVE_cve_id_key" ON "CVE"("cve_id");

-- CreateIndex
CREATE UNIQUE INDEX "CVE_identifier_key" ON "CVE"("identifier");

-- AddForeignKey
ALTER TABLE "CPE" ADD CONSTRAINT "CPE_cve_id_fkey" FOREIGN KEY ("cve_id") REFERENCES "CVE"("cve_id") ON DELETE CASCADE ON UPDATE CASCADE;
