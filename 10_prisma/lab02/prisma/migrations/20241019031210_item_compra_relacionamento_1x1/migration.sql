/*
  Warnings:

  - A unique constraint covering the columns `[produto_id]` on the table `ItemCompra` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ItemCompra_produto_id_key` ON `ItemCompra`(`produto_id`);
