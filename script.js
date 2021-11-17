var dados = []

function PopulaTabela() {
    if(Array.isArray(dados)) {
        $('#tbl-dados tbody').html('')
        dados.forEach(function(item) {
            //template string
            $('#tbl-dados tbody').append(`<tr>
                <td>${item.ID}</td>
                <td>${item.nome}</td>
                <td>${item.sobrenome}</td>
                <td>${item.dataNascimento}</td>
                <td>${item.formacao}</td>
            </tr>`)
        })
    }
}

$(function () {
    //executa ao carregar a tela
    dados = JSON.parse(localStorage.getItem('__dados__'))

    if(dados) {
        PopulaTabela()
    }

})