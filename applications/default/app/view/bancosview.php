<!-- Actions bar -->
<div class="zdk-action-bar" data-zdk-dialog="bancos-dlg" data-zdk-datatable="bancos-table">
    <!-- Action buttons -->
     <button class="zdk-bt-refresh"></button>
    <button class="zdk-bt-add">Novo</button>
    <button class="zdk-bt-edit" data-zdk-noselection="Por favor, escolha um banco para editar!">Editar</button>
    <button class="zdk-bt-remove" data-zdk-noselection="Por favor, escolha um banco para remover!"
            data-zdk-confirm="Você realmente deseja remover o banco selecionado?:Sim:Não"
            data-zdk-action="bancosctrl:remove">Remover</button>
    <!-- Number of rows per page -->
    <select class="zdk-select-rows" title="Linhas">  
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="100">100</option>
    </select>
    <!-- Search form -->
    <div class="zdk-filter-rows">
        <input title="Pesquisar..." data-zdk-action="bancosctrl:suggestions">
        <button class="zdk-bt-clear" title="Resetar critérios de pesquisa..."></button>
        <button class="zdk-bt-search" title="Buscar os bancos que correspondem aos critérios..."
                data-zdk-novalue="Por favor, digite um critério primeiro."></button>
    </div>
</div>
<!-- Datatable -->
<div id="bancos-table" class="zdk-datatable zdk-synchronize" title="Bancos" data-zdk-action="bancosctrl:data"
    data-zdk-paginator="10" data-zdk-columns='[
        {"field": "codigo_febraban", "headerText": "Cód. FEBRABAN", "sortable": true},
        {"field": "banco", "headerText": "Banco", "sortable": true},
        {"field": "site", "headerText": "Site", "sortable": true}]'>
</div>
<div class="zdk-action-bar">
    <button id="bt_reset_data" title="Reinitialize the demo data to their original values." class="pui-button ui-widget ui-state-default ui-corner-all pui-button-text-icon-right" role="button" aria-disabled="false"><span class="pui-button-icon-right ui-icon ui-icon-arrowreturnthick-1-w"></span><span class="pui-button-text">Reset the demo</span></button>
</div>
<!-- Form dialog -->
<div id="bancos-dlg" class="zdk-modal" title="Bancos" data-zdk-width="480px"
    data-zdk-confirm="Deseja realmente cancelar as alterações?:Sim:Não">
    <form class="zdk-form" data-zdk-action="bancosctrl:save" data-zdk-datatable="bancos-datatable">
        <label for="banco">Banco:</label>
        <input type="text" id="banco" name="banco" maxlength="100" required>
        <label for="codigo_febraban">Cód. FEBRABAN:</label>
        <input type="text" id="codigo_febraban" name="codigo_febraban" maxlength="10">
        <label for="digito_febraban">Dígito FEBRABAN:</label>
        <input type="text" id="digito_febraban" name="digito_febraban" maxlength="10">
        <label for="site">Site:</label>
        <input type="url" id="site" name="site" maxlength="255" data-zdkerrmsg-type="Este não é o formato de um site vállido!">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" maxlength="255" data-zdkerrmsg-type="Este não é o formato de um e-mail válido!">
        <input type="hidden" id="id" name="id">
        <button class="zdk-bt-save zdk-close-dialog" type="submit">Salvar</button>
        <button class="zdk-bt-cancel zdk-close-dialog" type="button">Cancelar</button>
    </form>
</div>