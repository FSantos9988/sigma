<?php
namespace app\controller;

class BancosCtrl extends \AppController {
    protected static function action_save() {
        // 1) Read POST parameter's values
        $request = new \Request();
        $row     = $request->getValuesAsMap(
            'id', 'banco', 'codigo_febraban', 'digito_febraban', 'site', 'email'
        ); 

        // 2) Store values into the database
        $BancosDAO = new \app\model\BancosDAO();
        $response  = new \Response();
        
        try {
            $BancoID = $BancosDAO->store($row);
            $response->setSuccessMessage('Salvar', \General::getFilledMessage('Banco %1 salvo com sucesso!', $BancoID));
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Salvar', \General::getFilledMessage('Erro ao salvar banco %1! (erro: %2)', $request->part_number, $ex->getCode()));
        }

        // 3) Return JSON response
        return $response;
    }

    protected static function action_remove() {
        // 1) Get row ID from the POST parameter
        $request = new \Request();
        $rowID   = $request->id;

        // 2) Remove the specified row from the database
        $BancosDAO = new \app\model\BancosDAO();
        $response  = new \Response();

        try {
            $BancosDAO->remove($rowID);
            $response->setSuccessMessage('Remover', \General::getFilledMessage('Banco %1 removido com sucesso!', $rowID));
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Remover', \General::getFilledMessage('Erro ao remover banco %1! (erro: %2)', $rowID, $ex->getCode()));
        }

        // 3) Return JSON response
        return $response;
    }

    protected static function action_get() {
        $response = new \Response();
        $BancosDAO = new \app\model\BancosDAO();
        $BancosDAO->setSortCriteria('bco.codigo_febraban ASC');
        $BancosFound = array();

        while ($row = $BancosDAO->getResult()) {
            $BancosFound[] = array('label' => $row['codigo_febraban'] . ' - ' . $row['banco'], 'value' => $row['id']);
        }

        $response->rows = $BancosFound;
        $response->success = TRUE;

        return $response;
    }

    protected static function action_data() {
        // 1) Read POST parameters
        $request = new \Request();
        // --> Pagination
        $first = $request->first;
        $rows  = $request->rows;
        // --> Sort criteria
        $sortField = $request->sortField;
        $sortOrder  = $request->sortOrder;
        $sortCriteria = is_null($sortField)
            ? 'banco ASC'
            : $sortField . (
                is_null($sortOrder)
                    ? ' ASC'
                    : ($sortOrder == 1 ? ' ASC' : ' DESC')
            );
        // --> Filter criteria
        $criteria = $request->search_criteria;
        $keyword  = '%' . $criteria . '%';

        // 2) Request rows from the database
        $response = new \Response();
        $BancosDAO = new \app\model\BancosDAO();
        $BancosDAO->setKeywordAsFilter($keyword);
        $BancosFound = array();

        try {
            $response->total = $BancosDAO->getCount();
            $BancosDAO->setSortCriteria($sortCriteria);
            $BancosDAO->setLimit($first, $rows);

            while ($row = $BancosDAO->getResult()) {
                $BancosFound[] = $row;
            }
            $response->rows = $BancosFound;
            $response->success = TRUE;
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Buscar', \General::getFilledMessage('Erro ao buscar bancos! (erro: %1)', $ex->getCode()));
            $response->success = FALSE;
        }

        // 3) Return JSON response
        return $response;
    }

    protected static function action_suggestions() {
        // 1) Read POST parameters
        $request = new \Request();

        $BancosDAO = new \app\model\BancosDAO();
        $BancosDAO->setKeywordAsFilter('%' . $request->criteria . '%');
        $BancosDAO->setLimit(0, 10); // Limit to 10 suggestions

        $response = new \Response();
        $previousSuggestion = '';
        $suggestions = array();

        try {
            while ($row = $BancosDAO->getResult()) {
                if ($row['banco'] !== $previousSuggestion) {
                    $suggestions[]['label'] = $row['banco'];
                    $previousSuggestion = $row['banco'];
                }
            }
            $response->setResponse($suggestions);
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Sugestões', \General::getFilledMessage('Erro ao buscar sugestões de bancos! (erro: %1)', $ex->getCode()));
        }

        // 3) Return JSON response
        return $response;
    }
}