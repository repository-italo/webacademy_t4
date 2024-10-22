-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `p_nome` VARCHAR(100) NOT NULL,
    `s_nome` VARCHAR(200) NOT NULL,
    `cpf` VARCHAR(15) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `num_celular` VARCHAR(13) NOT NULL,

    UNIQUE INDEX `Cliente_id_key`(`id`),
    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    UNIQUE INDEX `Cliente_num_celular_key`(`num_celular`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NOT NULL,
    `endereco` VARCHAR(256) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `rua` VARCHAR(200) NOT NULL,
    `numero` INTEGER NOT NULL,
    `complemento` VARCHAR(256) NOT NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(256) NOT NULL,
    `estado` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `Endereco_id_key`(`id`),
    UNIQUE INDEX `Endereco_id_cliente_id_key`(`id`, `cliente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria_id` INTEGER NOT NULL,
    `nome` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `SubCategoria_id_categoria_id_key`(`id`, `categoria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fabricante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(256) NOT NULL,
    `sub_categoria_id` INTEGER NOT NULL,
    `preco_base` DECIMAL(10, 2) NOT NULL,
    `categoria_id` INTEGER NOT NULL,
    `fabricante_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Modelo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serie_modelo` VARCHAR(15) NOT NULL,
    `produto_id` INTEGER NOT NULL,

    UNIQUE INDEX `Modelo_id_produto_id_key`(`id`, `produto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NOT NULL,
    `endereco_id` INTEGER NOT NULL,
    `desconto` DECIMAL(10, 2) NOT NULL,
    `preco_final` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compra_id` INTEGER NOT NULL,
    `modelo_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `produto_id` INTEGER NOT NULL,

    UNIQUE INDEX `ItemCompra_produto_id_key`(`produto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoria` ADD CONSTRAINT `SubCategoria_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_fabricante_id_fkey` FOREIGN KEY (`fabricante_id`) REFERENCES `Fabricante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_sub_categoria_id_categoria_id_fkey` FOREIGN KEY (`sub_categoria_id`, `categoria_id`) REFERENCES `SubCategoria`(`id`, `categoria_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Modelo` ADD CONSTRAINT `Modelo_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_endereco_id_cliente_id_fkey` FOREIGN KEY (`endereco_id`, `cliente_id`) REFERENCES `Endereco`(`id`, `cliente_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_compra_id_fkey` FOREIGN KEY (`compra_id`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_modelo_id_produto_id_fkey` FOREIGN KEY (`modelo_id`, `produto_id`) REFERENCES `Modelo`(`id`, `produto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
