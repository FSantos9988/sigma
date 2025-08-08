<?php
namespace app\controller;

class ContasBancariasCtrl extends \AppController {
    protected static function action_save() {
        // 1) Read POST parameter's values
        $request = new \Request();
        $row     = $request->getValuesAsMap(
            'id', 'id_agencia', 'descricao', 'tipo_conta', 
            'conta_numero', 'conta_dv', 'saldo_inicial', 
            'saldo_atual', 'limite_credito', 'data_abertura', 
            'data_encerramento', 'ativo', 'observacoes'
        );

        // 2) Store values into the database
        $ContasBancariasDAO = new \app\model\ContasBancariasDAO();
        $response = new \Response();

        try {
            $ContaID = $ContasBancariasDAO->store($row);
            $response->setSuccessMessage('Salvar', \General::getFilledMessage('Conta bancária %1 salva com sucesso!', $ContaID));
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Salvar', \General::getFilledMessage('Erro ao salvar conta bancária %1! (erro: %2)', $request->part_number, $ex->getMessage()));
        }

        // 3) Return JSON response
        return $response;
    }

    protected static function action_remove(){
        // 1) Get row ID from the POST parameter
        $request = new \Request();
        $rowID   = $request->id;

        // 2) Remove the specified row from the database
        $ContasBancariasDAO = new \app\model\ContasBancariasDAO();
        $response = new \Response();

        try {
            $ContasBancariasDAO->remove($rowID);
            $response->setSuccessMessage('Remover', \General::getFilledMessage('Conta bancária %1 removida com sucesso!', $rowID));
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Remover', \General::getFilledMessage('Erro ao remover conta bancária %1! (erro: %2)', $rowID, $ex->getMessage()));
        }

        // 3) Return JSON response
        return $response;
    }

    protected static function action_get() {
        $response = new \Response();
        $ContasBancariasDAO = new \app\model\ContasBancariasDAO();
        $ContasBancariasDAO->setSortCriteria('cba.conta_numero ASC');
        $ContasBancariasFound = array();

        while ($row = $ContasBancariasDAO->getResult()) {
            $ContasBancariasFound[] = array('label' => $row['conta_numero'] . ' - ' . $row['descricao'], 'value' => $row['id']);
        }

        $response->rows = $ContasBancariasFound;
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
        $sortField = $request->sortfield;
        $sortOrder = $request->sortorder;
        $sortCriteria = is_null($sortField)
            ? 'descricao
            
            '
            : $sortField . (
                is_null($sortOrder)
                    ? ' ASC'
                    : ($sortOrder == 1 ? ' ASC' : ' DESC')
            );
        // --> Filter criteria
        $criteria = $request->search_criteria;
        $keyword = '%' . $criteria . '%';

        // 2) Request rows from the database
        $response = new \Response();
        $ContasBancariasDAO = new \app\model\ContasBancariasDAO();
        $ContasBancariasDAO->setKeywordAsFilter($keyword);
        $ContasBancariasFound = array();

        try {
            $response->total = $ContasBancariasDAO->getCount();
            $ContasBancariasDAO->setSortCriteria($sortCriteria);
            $ContasBancariasDAO->setLimit($first, $rows);

            while ($row = $ContasBancariasDAO->getResult()) {
                $ContasBancariasFound[] = $row;
            }

            $response->rows = $ContasBancariasFound;
            $response->success = TRUE;
        } catch (\Throwable $th) {
            $response->setFailedMessage('Listar', \General::getFilledMessage('Erro ao listar contas bancárias! (erro: %1)', $th->getCode()));
            $response->success = FALSE;
        }
        
        // 3) Return JSON response
        return $response;
    }

    protected static function action_suggestions() {
        // 1) Read POST parameters
        $request = new \Request();

        $ContasBancariasDAO = new \app\model\ContasBancariasDAO();
        $ContasBancariasDAO->setContaAsFilter('%' . $request->criteria . '%');
        $ContasBancariasDAO->setLimit(0, 10); // Limit to 10 suggestions

        $response = new \Response();
        $previousSuggestion = '';
        $suggestions = array();

        try {
            while ($row = $ContasBancariasDAO->getResult()) {
                if ($row['descricao'] !== $previousSuggestion) {
                    $suggestions[]['label'] = $row['descricao'];
                    $previousSuggestion = $row['descricao'];
                }
            }
            $response->setResponse($suggestions);
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Sugestões', \General::getFilledMessage('Erro ao buscar sugestões de contas bancárias! (erro: %1)', $ex->getCode()));
        }

        // 3) Return JSON response
        return $response;
    }
}
