<?php
namespace app\model;

class AgenciasDAO extends \DAO {
    protected function initDaoProperties() {
        $this->table = "agencias";
        $this->IdColumnName = "id";

        $this->query  = " SELECT agc.id, agc.id_banco, agc.agencia, agc.agencia_codigo, ";
        $this->query .= " agc.agencia_dv, agc.endereco, agc.complemento, agc.numero, ";
        $this->query .= " agc.cep, agc.bairro, agc.cidade, agc.uf, agc.telefone, ";
        $this->query .= " agc.ramal, agc.observacoes, CONCAT(bco.codigo_febraban, ' - ', bco.banco) AS banco ";
        $this->query .= " FROM agencias agc ";
        $this->query .= " INNER JOIN bancos bco ON bco.id = agc.id_banco ";
    }

    public function setKeywordAsFilter($keyword) {
        $this->filterClause = " WHERE LOWER(agc.agencia) LIKE LOWER(?) "
            . " OR LOWER(agc.agencia_codigo) LIKE LOWER(?) "
            . " OR LOWER(agc.agencia_dv) LIKE LOWER(?) "
            . " OR LOWER(agc.telefone) LIKE LOWER(?) "
            . " OR LOWER(agc.ramal) LIKE LOWER(?) ";
        $this->setFilterCriteria($keyword, $keyword, $keyword, $keyword, $keyword);
    }

    public function setAgenciaAsFilter($name) {
        $this->filterClause = " WHERE LOWER(agc.agencia) LIKE LOWER(?)";
        $this->setFilterCriteria($name);
    }
}