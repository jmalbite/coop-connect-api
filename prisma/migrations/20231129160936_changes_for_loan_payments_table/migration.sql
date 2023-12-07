/*
  Warnings:

  - Added the required column `paymentType` to the `LoansPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoansPayments" ADD COLUMN     "paymentType" INTEGER NOT NULL;
