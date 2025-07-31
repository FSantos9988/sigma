<?php
namespace app\model;

class ParceirosDAO extends \DAO 
{
    protected function initDaoProperties() {
        $this->table = "parceiros";
    }
}