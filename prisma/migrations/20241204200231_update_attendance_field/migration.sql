/*
  Warnings:

  - The `attendance` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "attendance",
ADD COLUMN     "attendance" TEXT[];
