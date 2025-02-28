-- CreateTable
CREATE TABLE "CVE" (
    "id" TEXT NOT NULL,
    "sourceIdentifier" TEXT NOT NULL,
    "published" TIMESTAMP(3),
    "lastModified" TIMESTAMP(3),
    "vulnStatus" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "vectorString" TEXT NOT NULL,
    "accessVector" TEXT NOT NULL,
    "accessComplexity" TEXT NOT NULL,
    "authentication" TEXT NOT NULL,
    "confidentialityImpact" TEXT NOT NULL,
    "integrityImpact" TEXT NOT NULL,
    "availabilityImpact" TEXT NOT NULL,
    "exploitabilityScore" DOUBLE PRECISION,
    "impactScore" DOUBLE PRECISION,

    CONSTRAINT "CVE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPE" (
    "id" TEXT NOT NULL,
    "cveId" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "matchCriteriaId" TEXT NOT NULL,
    "vulnerable" BOOLEAN NOT NULL,

    CONSTRAINT "CPE_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CPE" ADD CONSTRAINT "CPE_cveId_fkey" FOREIGN KEY ("cveId") REFERENCES "CVE"("id") ON DELETE CASCADE ON UPDATE CASCADE;
