<?php
namespace app\model;

class BancosDAO extends \DAO {
    protected function initDaoProperties() {
        $this->table = "bancos";
        $this->IdColumnName = "id";

        $this->query  = " SELECT bco.id, bco.banco, bco.codigo_febraban, bco.digito_febraban, bco.site, bco.email ";
        $this->query .= " FROM bancos bco ";
    }

    public function setKeywordAsFilter($keyword) {
        $this->filterClause = " WHERE LOWER(bco.banco) LIKE LOWER(?) " 
            . " OR LOWER(bco.codigo_febraban) LIKE LOWER(?) "
            . " OR LOWER(bco.digito_febraban) LIKE LOWER(?) "
            . " OR LOWER(bco.site) LIKE LOWER(?) "
            . " OR LOWER(bco.email) LIKE LOWER(?) ";
        $this->setFilterCriteria($keyword, $keyword, $keyword, $keyword, $keyword);
    }
}