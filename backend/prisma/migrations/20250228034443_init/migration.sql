/*
  Warnings:

  - You are about to drop the column `exploitabilityScore` on the `CVE` table. All the data in the column will be lost.
  - You are about to drop the column `impactScore` on the `CVE` table. All the data in the column will be lost.
  - Added the required column `metrics` to the `CVE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CVE" DROP COLUMN "exploitabilityScore",
DROP COLUMN "impactScore",
ADD COLUMN     "metrics" JSONB NOT NULL;
