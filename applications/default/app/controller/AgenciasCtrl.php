<?php
namespace app\controller;

class AgenciasCtrl extends \AppController {
    protected static function action_save() {
        // 1) Read POST parameter's values
        $request = new \Request();
        $row     = $request->getValuesAsMap(
            'id', 'id_banco', 'agencia', 'agencia_codigo',
            'agencia_dv', 'endereco', 'complemento', 'numero',
            'cep', 'bairro', 'cidade', 'uf', 'telefone',
            'ramal', 'nome_gerente', 'email_gerente', 'celular_gerente',
            'observacoes'   
        ); 

        // 2) Store values into the database
        $AgenciasDAO = new \app\model\AgenciasDAO();
        $response    = new \Response();

        try {
            $AgenciaID = $AgenciasDAO->store($row);
            $response->setSuccessMessage('Salvar', \General::getFilledMessage('Agência %1 salva com sucesso!', $AgenciaID));
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Salvar', \General::getFilledMessage('Erro ao salvar agência %1! (erro: %2)', $request->part_number, $ex->getCode()));
        }  
        
        // 3) Return JSON response
        return $response;
    }

    protected static function action_remove() {
        // 1) Get row ID from the POST parameter
        $request = new \Request();
        $rowID   = $request->id;

        // 2) Remove the specified row from the database
        $AgenciasDAO = new \app\model\AgenciasDAO();
        $response    = new \Response();

        try {
            $AgenciasDAO->remove($rowID);
            $response->setSuccessMessage('Remover', \General::getFilledMessage('Agência %1 removida com sucesso!', $rowID));
        } catch (\Throwable $th) {
            $response->setFailedMessage('Remover', \General::getFilledMessage('Erro ao remover agência %1! (erro: %2)', $rowID, $th->getCode()));
        }

        // 3) Return JSON response
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
            ? 'agencia ASC'
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
        $AgenciasDAO = new \app\model\AgenciasDAO();
        $AgenciasDAO->setKeywordAsFilter($keyword);
        $AgenciasFound = array();

        try {
            $response->total = $AgenciasDAO->getCount();
            $AgenciasDAO->setSortCriteria($sortCriteria);
            $AgenciasDAO->setLimit($first, $rows);

            while ($row = $AgenciasDAO->getResult()) {
                $AgenciasFound[] = $row;
            }

            $response->rows = $AgenciasFound;
            $response->success = TRUE;
        } catch (\Throwable $th) {
            $response->setFailedMessage('Listar', \General::getFilledMessage('Erro ao listar agências! (erro: %1)', $th->getCode()));
            $response->success = FALSE;
        }

        // 3) Return JSON response
        return $response;
    }

    protected static function action_suggestions() {
        // 1) Read POST parameters
        $request = new \Request();

        $AgenciasDAO = new \app\model\AgenciasDAO();
        $AgenciasDAO->setKeywordAsFilter('%' . $request->criteria . '%');
        $AgenciasDAO->setLimit(0, 10); // Limit to 10 suggestions

        $response = new \Response();
        $previousSuggestion = '';
        $suggestions = array();

        try {
            while ($row = $AgenciasDAO->getResult()) {
                if ($row['agencia'] !== $previousSuggestion) {
                    $suggestions[]['label'] = $row['agencia'];
                    $previousSuggestion = $row['agencia'];
                }
            }
            $response->setResponse($suggestions);
        } catch (\PDOException $ex) {
            $response->setFailedMessage('Sugestões', \General::getFilledMessage('Erro ao buscar sugestões de agências! (erro: %1)', $ex->getCode()));
        }

        // 3) Return JSON response
        return $response;
    }
}