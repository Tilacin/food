/*
  Warnings:

  - You are about to drop the column `color` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "color";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address";
