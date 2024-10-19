/*
  Warnings:

  - Added the required column `nome` to the `SubCategoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subcategoria` ADD COLUMN `nome` VARCHAR(200) NOT NULL;
