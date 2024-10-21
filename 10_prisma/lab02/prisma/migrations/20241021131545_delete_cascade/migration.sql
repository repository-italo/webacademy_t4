-- DropForeignKey
ALTER TABLE `itemcompra` DROP FOREIGN KEY `ItemCompra_compra_id_fkey`;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_compra_id_fkey` FOREIGN KEY (`compra_id`) REFERENCES `Compra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
