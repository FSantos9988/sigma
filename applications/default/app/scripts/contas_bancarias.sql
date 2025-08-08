DROP TABLE IF EXISTS `contas_bancarias`;

CREATE TABLE IF NOT EXISTS `contas_bancarias` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_agencia` INT NOT NULL DEFAULT '0',
	`descricao` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_bin',
	`tipo_conta` CHAR(1) NOT NULL COLLATE 'utf8mb4_bin',
	`conta_numero` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`conta_dv` VARCHAR(5) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`saldo_inicial` DECIMAL(20,6) NULL DEFAULT NULL,
	`saldo_atual` DECIMAL(20,6) NULL DEFAULT NULL,
	`limite_credito` DECIMAL(20,6) NULL DEFAULT NULL,
	`data_abertura` TIMESTAMP NULL DEFAULT (now()),
	`data_encerramento` TIMESTAMP NULL DEFAULT (now()),
	`ativo` CHAR(1) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`observacoes` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_contas_bancarias_agencias` (`id_agencia`) USING BTREE
)
COLLATE='utf8mb4_bin'
ENGINE=MyISAM
AUTO_INCREMENT=4
;


INSERT INTO `contas_bancarias` (`id`, `id_agencia`, `descricao`, `tipo_conta`, `conta_numero`, `conta_dv`, `saldo_inicial`, `saldo_atual`, `limite_credito`, `data_abertura`, `data_encerramento`, `ativo`, `observacoes`) VALUES (1, 1, 'Conta Bancária Pagamentos', 'C', '1456269', '25', 1000.000000, 15236.960000, 0.000000, '2025-06-06 16:19:13', NULL, 'S', 'Conta para pagamento de salário');
INSERT INTO `contas_bancarias` (`id`, `id_agencia`, `descricao`, `tipo_conta`, `conta_numero`, `conta_dv`, `saldo_inicial`, `saldo_atual`, `limite_credito`, `data_abertura`, `data_encerramento`, `ativo`, `observacoes`) VALUES (2, 1, 'Conta Teste', 'C', NULL, NULL, NULL, 15963.000000, NULL, '2025-08-08 00:00:00', NULL, NULL, NULL);
INSERT INTO `contas_bancarias` (`id`, `id_agencia`, `descricao`, `tipo_conta`, `conta_numero`, `conta_dv`, `saldo_inicial`, `saldo_atual`, `limite_credito`, `data_abertura`, `data_encerramento`, `ativo`, `observacoes`) VALUES (3, 1, 'Conta Bancária Recebimentos', 'C', '145258', '5', 1000.000000, 15000.000000, 0.000000, '2023-01-11 00:00:00', NULL, 'S', 'Teste');
