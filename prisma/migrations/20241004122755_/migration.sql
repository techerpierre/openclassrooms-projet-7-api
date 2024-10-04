/*
  Warnings:

  - Added the required column `for` to the `Authorizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Authorizations" ADD COLUMN     "for" "UserRole" NOT NULL;
