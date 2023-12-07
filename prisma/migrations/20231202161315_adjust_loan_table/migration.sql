/*
  Warnings:

  - You are about to drop the column `interestAmount` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `interestPercentage` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `interestInAmount` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestInPercentage` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentPerPayDay` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmountToBePaid` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Made the column `processingFee` on table `Loan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "interestAmount",
DROP COLUMN "interestPercentage",
ADD COLUMN     "interestInAmount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "interestInPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentPerPayDay" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "remainingBalance" DECIMAL(12,2),
ADD COLUMN     "totalAmountToBePaid" DECIMAL(12,2) NOT NULL,
ALTER COLUMN "processingFee" SET NOT NULL;
