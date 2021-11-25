var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir esse registro?")
    //verifica se o usuário deseja realmente deletar o registro e caso sim, remove os dados do registro clicado do array dados, depois atualiza a tabela
    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)
            }
        }

        PopulaTabela()
    }
}

function EditaRegistro(id) {
    $('#modalRegistro').modal('show')

    //Faz a modal aparecer, busca pelo registro com o mesmo id enviado e preenche as informações dele nos campos
    dados.forEach(function (item) {
        if (item.ID == id) {
            $('#hdID').val(item.ID)
            $('#txtNome').val(item.nome)
            $('#txtSobrenome').val(item.sobrenome)
            $('#txtDtNascimento').val(item.dataNascimento.substr(6, 4) + '-' + item.dataNascimento.substr(3, 2) + '-' + item.dataNascimento.substr(0, 2))
            $('#txtFormacao').val(item.formacao)
        }
    })
}

//remove os objetos anteriores da tbody e exibe os dados de dentro da array dados no lugar
function PopulaTabela() {
    if (Array.isArray(dados)) {
        //armazena o array dados no localstorage como string
        localStorage.setItem("__dados__", JSON.stringify(dados))

        $('#tbl-dados tbody').html('')

        dados.forEach(function (item) {
            //template string
            $('#tbl-dados tbody').append(`<tr>
                <td>${item.ID}</td>
                <td>${item.nome}</td>
                <td>${item.sobrenome}</td>
                <td>${item.dataNascimento}</td>
                <td>${item.formacao}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript: EditaRegistro(${item.ID})"><i class="fa-solid fa fa-edit"></i></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript: ApagaRegistro(${item.ID});"><i class="fa fa-trash"></i></button></td>
                </tr>`)
        })
    }
}

$(function () {
    //executa ao carregar a tela
    dados = JSON.parse(localStorage.getItem('__dados__'))
    //coloca os objetos de dentro do localStorage no array dados
    if (dados) {
        PopulaTabela()
    }

    $('#btnSalvar').click(function () {
        //evento de click do botão salvar

        //pega o valor dos inputs
        let _id = $('#hdID').val()
        let Nome = $('#txtNome').val()
        let Sobrenome = $('#txtSobrenome').val()
        let DtNascimento = new Date($('#txtDtNascimento').val()).toLocaleDateString('pt-br', { timeZone: 'UTC' })
        let Formacao = $('#txtFormacao').val()

        //verifica se o hidden ID está vazio, se não estiver, ele adiciona esse registro no array, se não, ele muda os atributos para os novos valores dos inputs
        if (!_id || _id == '0') {
            let registro = {}
            //definine cada atributo do registro com o valor dos inputs
            registro.nome = Nome
            registro.sobrenome = Sobrenome
            registro.dataNascimento = DtNascimento
            registro.formacao = Formacao

            registro.ID = dados.length + 1
            //coloca o registro dentro do array dados
            dados.push(registro)
        } else {
            dados.forEach(function (item) {
                if (item.ID == _id) {
                    item.nome = Nome
                    item.sobrenome = Sobrenome
                    item.dataNascimento = DtNascimento
                    item.formacao = Formacao
                }
            })
        }

        alert("Registro salvo com sucesso")
        $('#modalRegistro').modal('hide')

        //limpa os dados dos inputs
        $('#hdID').val('0')
        $('#txtNome').val('')
        $('#txtSobrenome').val('')
        $('#txtDtNascimento').val('')
        $('#txtFormacao').val('')

        PopulaTabela()
    })

})