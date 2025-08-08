<!-- Actions bar -->
<div class="zdk-action-bar" data-zdk-dialog="agencias-dlg" data-zdk-datatable="agencias-table">
    <!-- Action buttons -->
    <button class="zdk-bt-refresh"></button>
    <button class="zdk-bt-add">Novo</button>
    <button class="zdk-bt-edit" data-zdk-noselection="Por favor, escolha uma agência para editar!">Editar</button>
    <button class="zdk-bt-remove" data-zdk-noselection="Por favor, escolha uma agência para remover!"
            data-zdk-confirm="Você realmente deseja remover a agência selecionada?:Sim:Não"
            data-zdk-action="agenciasctrl:remove">Remover</button>
    <!-- Number of rows per page -->
    <select class="zdk-select-rows" title="Linhas">  
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="100">100</option>
    </select>
    <!-- Search form -->
    <div class="zdk-filter-rows">
        <input title="Pesquisar..." data-zdk-action="agenciasctrl:suggestions">
        <button class="zdk-bt-clear" title="Resetar critérios de pesquisa..."></button>
        <button class="zdk-bt-search" title="Buscar os bancos que correspondem aos critérios..."
                data-zdk-novalue="Por favor, digite um critério primeiro."></button>
    </div>
</div>
<!-- Datatable -->
<div id="agencias-table" class="zdk-datatable zdk-synchronize" title="Agências" data-zdk-action="agenciasctrl:data"
    data-zdk-paginator="10" data-zdk-columns='[
        {"field": "banco", "headerText": "Banco", "sortable": false},
        {"field": "agencia", "headerText": "Agência", "sortable": true},
        {"field": "agencia_codigo", "headerText": "Código", "sortable": true},
        {"field": "agencia_dv", "headerText": "Dígito", "sortable": true},
        {"field": "telefone", "headerText": "Telefone", "sortable": true},
        {"field": "ramal", "headerText": "Ramal", "sortable": true}
    ]'>
</div>
<div class="zdk-action-bar">
    <button id="bt_reset_data" title="Reinitialize the demo data to their original values." class="pui-button ui-widget ui-state-default ui-corner-all pui-button-text-icon-right" role="button" aria-disabled="false"><span class="pui-button-icon-right ui-icon ui-icon-arrowreturnthick-1-w"></span><span class="pui-button-text">Reset the demo</span></button>
</div>
<!-- Form dialog -->
<div id="agencias-dlg" class="zdk-modal" title="Agências" data-zdk-width="400px"
    data-zdk-confirm="Deseja realmente cancelar as alterações?:Sim:Não">
    <form class="zdk-form" data-zdk-action="agenciasctrl:save" data-zdk-datatable="agencias-table">
        <input type="hidden" id="id" name="id">
        <fieldset>
            <legend>Dados da Agência</legend>
            <label for="id_banco">Banco:</label>
            <select class="zdk-dropdown" id="id_banco" name="id_banco" 
                data-zdk-action="bancosctrl:get"
                data-zdk-noselection="Selecione um Banco..."
                data-zdkerrmsg-required="Selecione um Banco da lista!" required>
            </select>
            <label for="agencia">Agência:</label>
            <input type="text" id="agencia" name="agencia" maxlength="100" required>
            <label for="agencia_codigo">Código:</label>
            <input type="text" id="agencia_codigo" name="agencia_codigo" maxlength="15">
            <label for="agencia_dv">Dígito:</label>
            <input type="text" id="agencia_dv" name="agencia_dv" maxlength="5">
        </fieldset>
        <fieldset>
            <legend>Endereço</legend>
            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep" onblur="pesquisacep(this.value);" maxlength="10">
            <label for="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" maxlength="100">
            <label for="complemento">Complemento:</label>
            <input type="text" id="complemento" name="complemento" maxlength="100">
            <label for="numero">Número:</label>
            <input type="text" id="numero" name="numero" maxlength="10">
            <label for="bairro">Bairro:</label>
            <input type="text" id="bairro" name="bairro" maxlength="100">
            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" maxlength="100">
            <label for="uf">UF:</label>
            <input type="text" id="uf" name="uf" maxlength="2">
        </fieldset>
        <fieldset>
            <legend>Contato</legend>
            <label for="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" maxlength="15">
            <label for="ramal">Ramal:</label>
            <input type="text" id="ramal" name="ramal" maxlength="5">
        </fieldset>
        <fieldset>
            <legend>Observações</legend>
            <label for="observacoes">Observações:</label>
            <textarea id="observacoes" name="observacoes" maxlength="500"></textarea>
        </fieldset>
        <button class="zdk-bt-save zdk-close-dialog" type="submit">Salvar</button>
        <button class="zdk-bt-cancel zdk-close-dialog" type="button">Cancelar</button>
    </form>
</div>
<script>
    function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('endereco').value=("");
            document.getElementById('complemento').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");
    }

    function retorno(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('endereco').value=(conteudo.logradouro);
            document.getElementById('complemento').value=(conteudo.complemento);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('endereco').value="...";
                document.getElementById('complemento').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=retorno';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };
</script>