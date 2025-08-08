<?php
namespace app\model;

class ContasBancariasDAO extends \DAO {
    protected function initDaoProperties() {
        $this->table = "contas_bancarias";
        $this->IdColumnName = "id";
        $this->moneyColumns = array("saldo_inicial","saldo_atual","limite_credito");

        $this->query  = " SELECT cnt.id, cnt.id_agencia, cnt.descricao, cnt.tipo_conta, ";
		$this->query .= " CASE ";
		$this->query .= "   when cnt.tipo_conta = 'C' then 'Conta Corrente' ";
		$this->query .= "   when cnt.tipo_conta = 'P' then 'Conta Poupança' ";
		$this->query .= "   when cnt.tipo_conta = 'S' then 'Conta Salário' ";
		$this->query .= "   ELSE 'Não Informado' ";
		$this->query .= " END AS tipo_conta_desc, ";
		$this->query .= " cnt.conta_numero, cnt.conta_dv, cnt.saldo_inicial, cnt.saldo_atual, ";
		$this->query .= " cnt.limite_credito, cnt.ativo, ";
		$this->query .= " cnt.data_abertura, cnt.data_encerramento, ";
		$this->query .= " CASE ";
		$this->query .= "   when cnt.ativo = 'S' then 'ATIVO' ";
		$this->query .= "   when cnt.ativo = 'N' then 'INATIVO' ";
		$this->query .= "   ELSE 'Não Informado' ";
		$this->query .= " END AS ativo_desc, ";
		$this->query .= " cnt.observacoes, ";
		$this->query .= " CONCAT(agc.agencia_codigo,' - ',agc.agencia) AS agencia, ";
		$this->query .= " CONCAT(bco.codigo_febraban,' - ',bco.banco) AS banco ";
		$this->query .= " FROM contas_bancarias cnt ";
		$this->query .= " INNER JOIN agencias agc ON agc.id = cnt.id_agencia ";
		$this->query .= " INNER JOIN bancos bco ON bco.id = agc.id_banco ";
    }

    public function setKeywordAsFilter($keyword) {
        $this->filterClause = " WHERE cnt.descricao LIKE LOWER(?) "
            . " OR cnt.tipo_conta LIKE LOWER(?) "
            . " OR cnt.conta_numero LIKE LOWER(?) "
            . " OR cnt.conta_dv LIKE LOWER(?) "
            . " OR cnt.saldo_atual = ? ";
        $this->setFilterCriteria($keyword, $keyword, $keyword, $keyword, $keyword);
    }

    public function setContaAsFilter($name) {
        $this->filterClause = " WHERE cnt.descricao LIKE LOWER(?)";
        $this->setFilterCriteria($name);
    }
}
