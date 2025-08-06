<?php
namespace app\model;

class BancosDAO extends \DAO {
    protected function initDaoProperties() {
        $this->table = "bancos";
    }

    public function setKeywordAsFilter($keyword) {
        $this->filterClause = " WHERE LOWER(banco) LIKE LOWER(?) " 
            . " OR LOWER(codigo_febraban) LIKE LOWER(?) "
            . " OR LOWER(digito_febraban) LIKE LOWER(?) "
            . " OR LOWER(site) LIKE LOWER(?) "
            . " OR LOWER(email) LIKE LOWER(?) ";
        $this->setFilterCriteria($keyword, $keyword, $keyword, $keyword, $keyword);
    }
}