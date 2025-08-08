DROP TABLE IF EXISTS `agencias`;

CREATE TABLE IF NOT EXISTS `agencias` (
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
	`observacoes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_agencias_bancos` (`id_banco`) USING BTREE
)
COLLATE='utf8mb4_bin'
ENGINE=MyISAM
AUTO_INCREMENT=4
;

INSERT INTO `agencias` (`id`, `id_banco`, `agencia`, `agencia_codigo`, `agencia_dv`, `endereco`, `complemento`, `numero`, `cep`, `bairro`, `cidade`, `uf`, `telefone`, `ramal`, `observacoes`) VALUES (1, 33, 'Cachoeirinha Centro', '2867', '3', 'Avenida Coronel João Batista S. da Silveira e Souza', NULL, '169', '94920100', 'Vila Eunice Nova', 'Cachoeirinha', 'RS', '(51) 3439-8000', NULL, NULL);
INSERT INTO `agencias` (`id`, `id_banco`, `agencia`, `agencia_codigo`, `agencia_dv`, `endereco`, `complemento`, `numero`, `cep`, `bairro`, `cidade`, `uf`, `telefone`, `ramal`, `observacoes`) VALUES (2, 101, 'Cachoeirinha', '0844', '3', 'Avenida General Flores da Cunha', 'de 0737/738 a 1157/1158', '971', '94910001', 'Vila Veranópolis', 'Cachoeirinha', 'RS', '(51) 4003-1043', NULL, NULL);
INSERT INTO `agencias` (`id`, `id_banco`, `agencia`, `agencia_codigo`, `agencia_dv`, `endereco`, `complemento`, `numero`, `cep`, `bairro`, `cidade`, `uf`, `telefone`, `ramal`, `observacoes`) VALUES (3, 114, 'CENTRO - CACHOEIRINHA', '8569', '4', 'Avenida Coronel João Batista S. da Silveira e Souza', NULL, '1523', '94920100', 'Vila Eunice Nova', 'Cachoeirinha', 'RS', '(51) 3439-8000', '120', 'Testeteteteugsdgfhjsgdfg');
