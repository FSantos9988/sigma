<?php
namespace app\model;

class AgenciasDAO extends \DAO {
    protected function initDaoProperties() {
        $this->table = "agencias";
    }

    public function setKeywordAsFilter($keyword) {
        $this->filterClause = " WHERE LOWER(agencia) LIKE LOWER(?) "
            . " OR LOWER(agencia_codigo) LIKE LOWER(?) "
            . " OR LOWER(agencia_dv) LIKE LOWER(?) "
            . " OR LOWER(endereco) LIKE LOWER(?) "
            . " OR LOWER(complemento) LIKE LOWER(?) "
            . " OR LOWER(numero) LIKE LOWER(?) "
            . " OR LOWER(cep) LIKE LOWER(?) "
            . " OR LOWER(bairro) LIKE LOWER(?) "
            . " OR LOWER(cidade) LIKE LOWER(?) "
            . " OR LOWER(uf) LIKE LOWER(?) "
            . " OR LOWER(telefone) LIKE LOWER(?) "
            . " OR LOWER(ramal) LIKE LOWER(?) "
            . " OR LOWER(nome_gerente) LIKE LOWER(?) "
            . " OR LOWER(email_gerente) LIKE LOWER(?) "
            . " OR LOWER(celular_gerente) LIKE LOWER(?) "
            . " OR LOWER(observacoes) LIKE LOWER(?) ";
        $this->setFilterCriteria(
            $keyword, $keyword, $keyword, $keyword, 
            $keyword, $keyword, $keyword, $keyword, 
            $keyword, $keyword, $keyword, $keyword, 
            $keyword, $keyword, $keyword, $keyword);
    }
}