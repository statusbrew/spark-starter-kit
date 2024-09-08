/*
  Warnings:

  - Added the required column `useremail` to the `Mentaltext` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentaltext" ADD COLUMN     "useremail" TEXT NOT NULL;
