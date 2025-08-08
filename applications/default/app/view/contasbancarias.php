<!-- Actions bar -->
<div class="zdk-action-bar" data-zdk-dialog="contasbancarias-dlg" data-zdk-datatable="contasbancarias-table">
    <!-- Action buttons -->
    <button class="zdk-bt-refresh"></button>
    <button class="zdk-bt-add">Novo</button>
    <button class="zdk-bt-edit" data-zdk-noselection="Por favor, escolha uma conta bancária para editar!">Editar</button>
    <button class="zdk-bt-remove" data-zdk-noselection="Por favor, escolha uma conta bancária para remover!"
            data-zdk-confirm="Você realmente deseja remover a conta bancária selecionada?:Sim:Não"
            data-zdk-action="contasbancariasctrl:remove">Remover</button>
    <!-- Number of rows per page -->
    <select class="zdk-select-rows" title="Linhas">  
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="100">100</option>
    </select>
    <!-- Search form -->
    <div class="zdk-filter-rows">
        <input title="Pesquisar..." data-zdk-action="contasbancariasctrl:suggestions">
        <button class="zdk-bt-clear" title="Resetar critérios de pesquisa..."></button>
        <button class="zdk-bt-search" title="Buscar as contas que correspondem aos critérios..."
                data-zdk-novalue="Por favor, digite um critério primeiro."></button>
    </div>
</div>
<!-- Datatable -->
<div id="contasbancarias-table" class="zdk-datatable zdk-synchronize" title="Contas Bancárias" data-zdk-action="contasbancariasctrl:data"
    data-zdk-paginator="10" data-zdk-columns='[
        {"field": "descricao", "headerText": "Descrição", "width": 200, "sortable": true},
        {"field": "tipo_conta_desc", "headerText": "Tipo", "width": 100, "sortable": true},
        {"field": "conta_numero", "headerText": "Número", "width": 100, "sortable": true},
        {"field": "conta_dv", "headerText": "DV", "width": 50, "sortable": true},
        {"field": "saldo_atual", "headerText": "Saldo Atual", "width": 100, "sortable": true},
        {"field": "data_abertura", "headerText": "Data de Abertura", "width": 100, "sortable": true},
        {"field": "data_encerramento", "headerText": "Data de Encerramento", "width": 100, "sortable": true}
    ]'>
</div>
<div class="zdk-action-bar">
    <button id="bt_reset_data" title="Reinitialize the demo data to their original values." class="pui-button ui-widget ui-state-default ui-corner-all pui-button-text-icon-right" role="button" aria-disabled="false"><span class="pui-button-icon-right ui-icon ui-icon-arrowreturnthick-1-w"></span><span class="pui-button-text">Reset the demo</span></button>
</div>
<!-- Form dialog -->
<div id="contasbancarias-dlg" class="zdk-modal" title="Contas Bancárias" data-zdk-width="480px"
    data-zdk-confirm="Deseja realmente cancelar as alterações?:Sim:Não">
    <form class="zdk-form" data-zdk-action="contasbancariasctrl:save" data-zdk-datatable="contasbancarias-table">
        <input type="hidden" id="id" name="id">
        <label for="id_agencia">Agência:</label>
        <select class="zdk-dropdown" id="id_agencia" name="id_agencia" 
            data-zdk-action="agenciasctrl:get"
            data-zdk-noselection="Selecione uma Agência..."
            data-zdkerrmsg-required="Selecione uma Agência da lista!" required>
        </select>
        <label for="descricao">Descrição:</label>
        <input type="text" id="descricao" name="descricao" maxlength="100" required>
        <label for="tipo_conta">Tipo de Conta:</label>
        <select class="zdk-dropdown" id="tipo_conta" name="tipo_conta" data-zdk-width="180px" required>
            <option value="">Selecione um Tipo de Conta...</option>
            <option value="C">Conta Corrente</option>
            <option value="P">Conta Poupança</option>
            <option value="S">Conta Salário</option>
        </select>
        <label for="conta_numero">Número da Conta:</label>
        <input type="text" id="conta_numero" name="conta_numero" maxlength="15">
        <label for="conta_dv">Dígito da Conta:</label>
        <input type="text" id="conta_dv" name="conta_dv" maxlength="5">
        <label for="saldo_inicial">Saldo Inicial:</label>
        <input type="number" id="saldo_inicial" name="saldo_inicial" maxlength="15">
        <label for="saldo_atual">Saldo Atual:</label>
        <input type="number" id="saldo_atual" name="saldo_atual" maxlength="15">
        <label for="limite_credito">Limite de Crédito:</label>
        <input type="number" id="limite_credito" name="limite_credito" maxlength="15">
        <label for="data_abertura">Data de Abertura:</label>
        <input type="date" id="data_abertura" name="data_abertura">
        <label for="data_encerramento">Data de Encerramento:</label>
        <input type="date" id="data_encerramento" name="data_encerramento">
        <label for="ativo">Ativo:</label>
        <select class="zdk-dropdown" id="ativo" name="ativo">
            <option value="">Selecione uma Opção...</option>
            <option value="S">Sim</option>
            <option value="N">Não</option>
        </select>
        <label for="observacoes">Observações:</label>
        <textarea id="observacoes" name="observacoes" rows="4" maxlength="500"></textarea>
        <button class="zdk-bt-save zdk-close-dialog" type="submit">Salvar</button>
        <button class="zdk-bt-cancel zdk-close-dialog" type="button">Cancelar</button>
    </form>
</div>