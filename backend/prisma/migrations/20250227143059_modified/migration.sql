/*
  Warnings:

  - You are about to drop the `CPE` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CPE" DROP CONSTRAINT "CPE_cveId_fkey";

-- AlterTable
ALTER TABLE "CVE" ADD COLUMN     "score" DOUBLE PRECISION,
ALTER COLUMN "accessComplexity" DROP NOT NULL,
ALTER COLUMN "accessVector" DROP NOT NULL,
ALTER COLUMN "authentication" DROP NOT NULL,
ALTER COLUMN "availabilityImpact" DROP NOT NULL,
ALTER COLUMN "confidentialityImpact" DROP NOT NULL,
ALTER COLUMN "integrityImpact" DROP NOT NULL,
ALTER COLUMN "vectorString" DROP NOT NULL;

-- DropTable
DROP TABLE "CPE";
