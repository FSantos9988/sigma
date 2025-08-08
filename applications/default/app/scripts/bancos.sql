DROP TABLE IF EXISTS `bancos`;

CREATE TABLE IF NOT EXISTS `bancos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`banco` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_bin',
	`codigo_febraban` VARCHAR(5) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`digito_febraban` VARCHAR(5) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`site` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	`email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_bin'
ENGINE=MyISAM
AUTO_INCREMENT=115
;

INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (1, 'Banco ABC Brasil S.A.', '246', NULL, 'www.abcbrasil.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (2, 'Banco Afinz S.A. Banco Múltiplo', '299', NULL, 'afinz.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (3, 'Banco Agibank S.A.', '121', NULL, 'www.agibank.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (4, 'Banco Andbank (Brasil) S.A.', '065', NULL, 'www.andbank-lla.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (5, 'Banco B3 S.A.', '096', NULL, 'www.bmfbovespa.com.br/bancobmfbovespa/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (6, 'Banco BANDEPE S.A.', '024', NULL, 'www.santander.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (7, 'Banco BMG S.A.', '318', NULL, 'www.bancobmg.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (8, 'Banco BNP Paribas Brasil S.A.', '752', NULL, 'www.bnpparibas.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (9, 'Banco BOCOM BBM S.A.', '107', NULL, 'www.bancobbm.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (10, 'Banco Bradescard S.A.', '063', NULL, 'www.ibi.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (11, 'Banco Bradesco BBI S.A.', '036', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (12, 'Banco Bradesco Financiamentos S.A.', '394', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (13, 'Banco Bradesco S.A.', '237', NULL, 'https://www.bradesco.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (14, 'Banco BS2 S.A.', '218', NULL, 'www.bs2.com/banco/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (15, 'Banco BTG Pactual S.A.', '208', NULL, 'www.btgpactual.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (16, 'Banco C6 Consignado S.A.', '626', NULL, 'https://www.c6consig.com.br/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (17, 'Banco C6 S.A.', NULL, NULL, 'https://www.c6bank.com/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (18, 'Banco Caixa Geral - Brasil S.A.', '473', NULL, 'www.bcgbrasil.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (19, 'Banco Cargill S.A.', '040', NULL, 'www.bancocargill.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (20, 'Banco Cifra S.A.', '233', NULL, 'www.bancocifra.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (21, 'Banco Citibank S.A.', '745', NULL, 'www.citibank.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (22, 'Banco CNH Industrial Capital S.A.', NULL, NULL, 'www.cnhindustrialcapital.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (23, 'Banco Cooperativo Sicoob S.A.', '756', NULL, 'www.Sicoob.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (24, 'Banco Cooperativo Sicredi S.A.', '748', NULL, 'www.sicredi.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (25, 'Banco Credit Agricole Brasil S.A.', '222', NULL, 'www.calyon.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (26, 'Banco Credit Suisse (Brasil) S.A.', '505', NULL, 'www.csfb.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (27, 'Banco CSF S.A.', NULL, NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (28, 'Banco da Amazônia S.A.', '003', NULL, 'www.bancoamazonia.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (29, 'Banco Daycoval S.A.', '707', NULL, 'www.daycoval.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (30, 'Banco de Lage Landen Brasil S.A.', NULL, NULL, 'www.dllgroup.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (31, 'Banco Digimais S.A.', '654', NULL, 'www.bancodigimais.com.br/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (32, 'Banco Digio S.A.', NULL, NULL, 'www.aebb.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (33, 'Banco do Brasil S.A.', '001', NULL, 'https://www.bb.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (34, 'Banco do Estado de Sergipe S.A.', '047', NULL, 'www.banese.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (35, 'Banco do Estado do Pará S.A.', '037', NULL, 'www.banpara.b.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (36, 'Banco do Estado do Rio Grande do Sul S.A.', '041', NULL, 'www.banrisul.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (37, 'Banco do Nordeste do Brasil S.A.', '004', NULL, 'www.banconordeste.gov.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (38, 'Banco Fibra S.A.', '224', NULL, 'www.bancofibra.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (39, 'Banco Fidis S.A.', NULL, NULL, 'www.bancofidis.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (40, 'Banco Finaxis S.A.', '094', NULL, 'www.bancofinaxis.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (41, 'Banco Genial S.A.', '125', NULL, 'www.bancogenial.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (42, 'Banco GM S.A.', NULL, NULL, 'www.chevroletsf.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (43, 'Banco Guanabara S.A.', '612', NULL, 'www.bancoguanabara.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (44, 'Banco HSBC S.A.', '269', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (45, 'Banco IBM S.A.', NULL, NULL, 'www.ibm.com/financing/br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (46, 'Banco Inbursa S.A.', '012', NULL, 'www.bancoinbursa.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (47, 'Banco Industrial do Brasil S.A.', '604', NULL, 'www.bancoindustrial.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (48, 'Banco Inter S.A.', '077', NULL, 'www.bancointer.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (49, 'Banco Investcred Unibanco S.A.', '249', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (50, 'Banco Itaú BBA S.A.', '184', NULL, 'www.itaubba.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (51, 'Banco Itaú Consignado S.A.', '029', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (52, 'Banco Itaú Veí­culos S.A.', NULL, NULL, 'www.bancofiat.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (53, 'Banco ItauBank S.A', '479', NULL, 'www.itaubank.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (54, 'Banco Itaucard S.A.', NULL, NULL, 'www.itau.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (55, 'Banco J. P. Morgan S.A.', '376', NULL, 'www.jpmorgan.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (56, 'Banco J. Safra S.A.', '074', NULL, 'www.safra.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (57, 'Banco John Deere S.A.', '217', NULL, 'www.johndeere.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (58, 'Banco Letsbank S.A.', '630', NULL, 'www.letsbank.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (59, 'Banco Luso Brasileiro S.A.', '600', NULL, 'www.lusobrasileiro.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (60, 'Banco Master S.A.', '243', NULL, 'www.bancomaster.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (61, 'Banco Mercantil do Brasil S.A.', '389', NULL, 'www.mercantil.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (62, 'Banco Mizuho do Brasil S.A.', '370', NULL, 'www.mizuhogroup.com/americas/brazil', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (63, 'Banco Modal S.A.', '746', NULL, 'www.bancomodal.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (64, 'Banco Morgan Stanley S.A.', '066', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (65, 'Banco MUFG Brasil S.A.', '456', NULL, 'www.br.bk.mufg.jp', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (66, 'Banco Nacional de Desenvolvimento Econômico e Social - BNDES', '007', NULL, 'www.bndes.gov.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (67, 'Banco Original S.A.', '212', NULL, 'www.original.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (68, 'Banco Ourinvest S.A.', '712', NULL, 'www.ourinvest.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (69, 'Banco PAN S.A.', '623', NULL, 'www.bancopan.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (70, 'Banco Paulista S.A.', '611', NULL, 'www.bancopaulista.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (71, 'Banco Pine S.A.', '643', NULL, 'www.pine.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (72, 'Banco Rabobank International Brasil S.A.', '747', NULL, 'www.rabobank.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (73, 'Banco RCI Brasil S.A.', NULL, NULL, 'www.bancorenault.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (74, 'Banco Rendimento S.A.', '633', NULL, 'www.rendimento.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (75, 'Banco Rodobens S.A.', '120', NULL, 'www.rodobens.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (76, 'Banco Safra S.A.', '422', NULL, 'www.safra.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (77, 'Banco Santander  (Brasil)  S.A.', '033', NULL, 'www.santander.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (78, 'Banco Semear S.A.', '743', NULL, 'www.bancosemear.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (79, 'Banco Senff S.A.', '276', NULL, 'https://www.senff.com.br/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (80, 'Banco Société Générale Brasil S.A.', '366', NULL, 'www.sgbrasil.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (81, 'Banco Sumitomo Mitsui Brasileiro S.A.', '464', NULL, 'www.smbcgroup.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (82, 'Banco Topázio S.A.', '082', NULL, 'www.bancotopazio.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (83, 'Banco Toyota do Brasil S.A.', NULL, NULL, 'www.bancotoyota.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (84, 'Banco Travelex S.A.', '095', NULL, 'https://www.travelexbank.com.br/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (85, 'Banco Triângulo S.A.', '634', NULL, 'www.tribanco.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (86, 'Banco Voiter S.A.', '653', NULL, 'www.voiter.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (87, 'Banco Volkswagen S.A.', NULL, NULL, 'www.bancovw.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (88, 'Banco Volvo Brasil S.A.', NULL, NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (89, 'Banco Votorantim S.A.', '655', NULL, 'www.bancovotorantim.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (90, 'Banco VR S.A.', '610', NULL, 'www.vrinvestimentos.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (91, 'Banco Western Union do Brasil S.A.', '119', NULL, 'www.bancowesternunion.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (92, 'Banco XP S.A.', '348', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (93, 'Banco Yamaha Motor do Brasil S.A.', NULL, NULL, 'www.yamaha-motor.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (94, 'BANESTES S.A. Banco do Estado do Espírito Santo', '021', NULL, 'www.banestes.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (95, 'Bank of America Merrill Lynch Banco Múltiplo S.A.', '755', NULL, 'www.ml.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (96, 'Bank Of China (Brasil) Banco Múltiplo S.A.', '320', NULL, 'www.br.ccb.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (97, 'BBVA Brasil Banco de Investimento S.A.', '496', NULL, 'https://www.bbva.com/en/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (98, 'BCV - Banco de Crédito e Varejo S.A.', '250', NULL, 'www.bancobcv.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (99, 'Braza Bank S.A. Banco de Câmbio', '128', NULL, 'www.msbank.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (100, 'BRB - Banco de Brasí­lia S.A.', '070', NULL, 'www.brb.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (101, 'Caixa Econômica Federal', '104', NULL, 'www.caixa.gov.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (102, 'Citibank N.A.', '477', NULL, 'www.citibank.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (103, 'Deutsche Bank S.A. - Banco Alemão', '487', NULL, 'www.deutsche-bank.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (104, 'Ebury Banco de Câmbio S.A.', '144', NULL, 'www.bexs.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (105, 'Hipercard Banco Múltiplo S.A.', '062', NULL, 'www.hipercard.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (106, 'Itaú Unibanco S.A.', '341', NULL, 'https://www.itau.com.br/', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (107, 'JPMorgan Chase Bank, National Association', '488', NULL, 'www.jpmorganchase.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (108, 'Kirton Bank S.A. - Banco Múltiplo', '399', NULL, NULL, NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (109, 'Paraná Banco S.A.', '254', NULL, 'www.paranabanco.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (110, 'Scania Banco S.A.', NULL, NULL, 'www.scaniabanco.com.br', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (111, 'Scotiabank Brasil S.A. Banco Múltiplo', '751', NULL, 'www.br.scotiabank.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (112, 'State Street Brasil S.A. - Banco Comercial', '014', NULL, 'www.statestreet.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (113, 'UBS Brasil Banco de Investimento S.A.', '129', NULL, 'www.ubs.com', NULL);
INSERT INTO `bancos` (`id`, `banco`, `codigo_febraban`, `digito_febraban`, `site`, `email`) VALUES (114, 'Banco Teste S.A.', '999', '9', 'https://www.bancoteste.com.br', NULL);
