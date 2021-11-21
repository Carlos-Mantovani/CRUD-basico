var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir esse registro?")
    //verifica se o usuário deseja realmente deletar o registro e caso sim, remove os dados do registro clicado do array dados, depois atualiza a tabela
    if(_confirm){
        for(let i = 0; i < dados.length; i++) {
            if(dados[i].ID == id){
                dados.splice(i, 1)
            }
        }

        PopulaTabela()
    }
}

function EditaRegistro(id) {

}

//remove os objetos anteriores da tbody e exibe os dados de dentro da array dados no lugar
function PopulaTabela() {
    if(Array.isArray(dados)) {
        //armazena o array dados no localstorage como string
        localStorage.setItem("__dados__", JSON.stringify(dados))

        $('#tbl-dados tbody').html('')
        
        dados.forEach(function(item) {
            //template string
            $('#tbl-dados tbody').append(`<tr>
                <td>${item.ID}</td>
                <td>${item.nome}</td>
                <td>${item.sobrenome}</td>
                <td>${item.dataNascimento}</td>
                <td>${item.formacao}</td>
                <td><button type="button" class="btn btn-primary"><i class="fa-solid fa fa-edit"></i></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript: ApagaRegistro(${item.ID});"><i class="fa fa-trash"></i></button></td>
                </tr>`)
        })
    }
}

$(function () {
    //executa ao carregar a tela
    dados = JSON.parse(localStorage.getItem('__dados__'))
    //coloca os objetos de dentro do localStorage no array dados
    if(dados) {
        PopulaTabela()
    }

    $('#btnSalvar').click(function () {
        //evento de click do botão salvar

        //pega o valor dos inputs
        let Nome = $('#txtNome').val()
        let Sobrenome = $('#txtSobrenome').val()
        let DtNascimento = new Date($('#txtDtNascimento').val()).toLocaleDateString('pt-br', { timeZone: 'UTC' })
        let Formacao = $('#txtFormacao').val()
        
        let registro = {}

        //definine cada atributo do registro com o valor dos inputs
        registro.nome = Nome
        registro.sobrenome = Sobrenome
        registro.dataNascimento = DtNascimento
        registro.formacao = Formacao

        registro.ID = dados.length + 1

        //coloca o registro dentro do array dados
        dados.push(registro)

        alert("Registro salvo com sucesso")
        $('#modalRegistro').modal('hide')

        //limpa os dados dos inputs
        $('#txtNome').val('')
        $('#txtSobrenome').val('')
        $('#txtDtNascimento').val('')
        $('#txtFormacao').val('')



        PopulaTabela()
    })

})