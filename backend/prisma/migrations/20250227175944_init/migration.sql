/*
  Warnings:

  - You are about to drop the column `score` on the `CVE` table. All the data in the column will be lost.
  - Made the column `accessComplexity` on table `CVE` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accessVector` on table `CVE` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authentication` on table `CVE` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availabilityImpact` on table `CVE` required. This step will fail if there are existing NULL values in that column.
  - Made the column `confidentialityImpact` on table `CVE` required. This step will fail if there are existing NULL values in that column.
  - Made the column `integrityImpact` on table `CVE` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vectorString` on table `CVE` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CVE" DROP COLUMN "score",
ALTER COLUMN "accessComplexity" SET NOT NULL,
ALTER COLUMN "accessVector" SET NOT NULL,
ALTER COLUMN "authentication" SET NOT NULL,
ALTER COLUMN "availabilityImpact" SET NOT NULL,
ALTER COLUMN "confidentialityImpact" SET NOT NULL,
ALTER COLUMN "integrityImpact" SET NOT NULL,
ALTER COLUMN "vectorString" SET NOT NULL,
ALTER COLUMN "lastModified" DROP NOT NULL,
ALTER COLUMN "published" DROP NOT NULL;

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
