/*
  Warnings:

  - You are about to drop the column `firsName` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `firsName`,
    ADD COLUMN `firstName` VARCHAR(100) NOT NULL;
