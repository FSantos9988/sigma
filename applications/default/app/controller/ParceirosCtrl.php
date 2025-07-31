<?php
namespace app\controller;

class ParceirosCtrl extends \AppController
{
    static protected function action_list() {
        $parceirosDAO = new \app\model\ParceirosDAO();
        $parceiros = array();

        while($row = $parceirosDAO->getResult()) {
            $parceiros[] = $row;
        }

        $response = new \Response();
        $response->rows = $parceiros;
        $response->success = TRUE;
        return $response;
    }

    static protected function action_save() {
        $request = new \Request();
        $row = $request->getValuesAsMap(
            'ID', 'RAZAO_SOCIAL', 'NOME_FANTASIA', 'ATIVO', 'E_CLIENTE',
            'E_FORNECEDOR', 'E_TRANSPORTADORA', 'E_REPRESENTANTE', 'EM_PROSPECCAO',
            'EM_APROVACAO', 'CEP', 'ENDERECO', 'COMPLEMENTO', 'NUMERO',
            'BAIRRO', 'CIDADE', 'ESTADO', 'PAIS', 'TELEFONE',
            'RAMAL', 'EMAIL', 'SITE', 'NOME_CONTATO', 'TRATAMENTO_CONTATO',
            'RG_CONTATO', 'CPF_CONTATO', 'CARGO_CONTATO', 'CELULAR_CONTATO_1',
            'CELULAR_CONTATO_2', 'EMAIL_CONTATO', 'TELEFONE_CONTATO', 'RAMAL_CONTATO',
            'NUMERO_INTERNO', 'DATA_CADASTRO', 'DATA_ULTIMA_ALTERACAO', 'DATA_ULTIMA_COMPRA',
            'DATA_ULTIMA_VENDA', 'REGIAO_ESTADO', 'NOME_CONTADOR', 'TELEFONE_CONTADOR',
            'EMAIL_CONTADOR', 'OBSERVACOES'
        );
        $parceirosDAO = new \app\model\ParceirosDAO();
        $result = $parceirosDAO->store($row);

        $response = new \Response();
        if ($result) {
            $response->setSuccessMessage('Salvar','Parceiro salvo com sucesso!');
        } else {
            $response->setFailedMessage('Salvar','Falha ao salvar parceiro!');
        }

        return $response;
    }

    static protected function action_delete() {
        $request = new \Request();
        $rowID = $request->ID;

        $parceirosDAO = new \app\model\ParceirosDAO();
        $result = $parceirosDAO->remove($rowID);

        $response = new \Response();
        if ($result) {
            $response->setSuccessMessage('Deletar','Parceiro deletado com sucesso!');
        } else {
            $response->setSuccessMessage('Deletar','Falha ao deletar parceiro!');
        }   
        return $response;    
    }
}