/*
  Warnings:

  - Added the required column `processingFee` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "processingFee" DECIMAL(12,2) NOT NULL;
