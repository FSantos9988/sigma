CREATE TABLE `agencias` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_banco` INT NOT NULL,
	`agencia` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_bin',
	`agencia_codigo` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`agencia_dv` VARCHAR(5) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`endereco` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`complemento` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`numero` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`cep` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`bairro` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`cidade` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`uf` CHAR(2) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`telefone` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`ramal` VARCHAR(5) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`nome_gerente` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`email_gerente` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`celular_gerente` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`observacoes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_agencias_bancos` (`id_banco`) USING BTREE
)
COLLATE='utf8mb4_bin'
ENGINE=MyISAM
;
