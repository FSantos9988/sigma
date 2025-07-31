<div class="zdk-action-bar" data-zdk-dialog="dlg_parceiros"
                            data-zdk-datatable="table_parceiros">
    <button class="zdk-bt-add" title="Novo Parceiro">Novo</button>
    <button class="zdk-bt-edit" title="Editar Parceiro">Editar</button>
    <button class="zdk-bt-remove" title="Deletar Parceiro">Deletar</button>
</div>
<div id="table_parceiros" class="zdk-datatable" title="Parceiros"
    data-zdk-action="parceirosctrl:list"
    data-zdk-columns='[{"field":"RAZAO_SOCIAL","headerText":"Razão Social"},
                       {"field":"NOME_FANTASIA","headerText":"Nome Fantasia"},
                       {"field":"ENDERECO","headerText":"Endereço"}]'>
</div>
<div id="dlg_parceiros" class="zdk-modal" title="Parceiros">
    <form class="zdk-form"
        data-zdk-action="parceirosctrl:save"
        data-zdk-datatable="table_parceiros">
        <label>Código: </label>
        <input name="ID" disabled type="text">
        <label>Razão Social: </label>
        <input name="RAZAO_SOCIAL" maxlength="100" required type="text">
        <label>Nome Fantasia: </label>
        <input name="NOME_FANTASIA" maxlength="100" type="text">
        <label>Endereço: </label>
        <input name="ENDERECO" maxlength="100" type="text">
        <button class="zdk-bt-save zdk-close-dialog" type="submit">Salvar</button>
        <button class="zdk-bt-cancel zdk-close-dialog" type="button">Cancelar</button>
    </form>
</div>