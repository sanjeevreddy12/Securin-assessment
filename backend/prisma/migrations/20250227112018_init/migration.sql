/*
  Warnings:

  - The primary key for the `CVE` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cve_id` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `exploitabilityScore` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `impactScore` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `last_modified` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the `CPE` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastModified` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceIdentifier` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vulnStatus` to the `CVE` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `CVE` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CPE" DROP CONSTRAINT "CPE_cve_id_fkey";

-- DropIndex
DROP INDEX "CVE_cve_id_key";

-- DropIndex
DROP INDEX "CVE_identifier_key";

-- AlterTable
ALTER TABLE "CVE" DROP CONSTRAINT "CVE_pkey",
DROP COLUMN "cve_id",
DROP COLUMN "exploitabilityScore",
DROP COLUMN "identifier",
DROP COLUMN "impactScore",
DROP COLUMN "last_modified",
DROP COLUMN "score",
DROP COLUMN "severity",
ADD COLUMN     "baseScoreV2" DOUBLE PRECISION,
ADD COLUMN     "baseScoreV3" DOUBLE PRECISION,
ADD COLUMN     "lastModified" TEXT NOT NULL,
ADD COLUMN     "published" TEXT NOT NULL,
ADD COLUMN     "sourceIdentifier" TEXT NOT NULL,
ADD COLUMN     "vulnStatus" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "CVE_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CVE_id_seq";

-- DropTable
DROP TABLE "CPE";
