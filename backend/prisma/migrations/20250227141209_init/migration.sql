/*
  Warnings:

  - You are about to drop the column `baseScoreV2` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `baseScoreV3` on the `CVE` table. All the data in the column will be lost.
  - Added the required column `accessComplexity` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessVector` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authentication` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availabilityImpact` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confidentialityImpact` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `integrityImpact` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vectorString` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `lastModified` on the `CVE` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `published` on the `CVE` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CVE" DROP COLUMN "baseScoreV2",
DROP COLUMN "baseScoreV3",
ADD COLUMN     "accessComplexity" TEXT NOT NULL,
ADD COLUMN     "accessVector" TEXT NOT NULL,
ADD COLUMN     "authentication" TEXT NOT NULL,
ADD COLUMN     "availabilityImpact" TEXT NOT NULL,
ADD COLUMN     "confidentialityImpact" TEXT NOT NULL,
ADD COLUMN     "exploitabilityScore" DOUBLE PRECISION,
ADD COLUMN     "impactScore" DOUBLE PRECISION,
ADD COLUMN     "integrityImpact" TEXT NOT NULL,
ADD COLUMN     "severity" TEXT NOT NULL,
ADD COLUMN     "vectorString" TEXT NOT NULL,
DROP COLUMN "lastModified",
ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL,
DROP COLUMN "published",
ADD COLUMN     "published" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "CPE" (
    "matchCriteriaId" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "vulnerable" BOOLEAN NOT NULL,
    "cveId" TEXT NOT NULL,

    CONSTRAINT "CPE_pkey" PRIMARY KEY ("matchCriteriaId")
);

-- AddForeignKey
ALTER TABLE "CPE" ADD CONSTRAINT "CPE_cveId_fkey" FOREIGN KEY ("cveId") REFERENCES "CVE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
