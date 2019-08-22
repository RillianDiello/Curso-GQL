const {perfis, proximoId} = require('../../data/db')

function indicePerfil(filtro){
    if(!filtro) return -1

    const {id,nome} = filtro
    if(id){
        return perfis.findIndex(p => p.id === filtro.id)
    }else if(nome){
        return perfis.findIndex(p => p.nome === filtro.nome)
    }

}

module.exports = {
    novoPerfil(_,
        {dados}
        ){
            const perfilExistente = perfis.some(p => p.nome === dados.nome)

            if(perfilExistente){
                throw new Error ('Perfil já cadastrado')
            }

            const novo = {
                id: proximoId(),
                ...dados
            }

            perfis.push(novo)

            return novo
        },

    excluirPerfil(_,
        { filtro}
        ){
            const i = indicePerfil(filtro)

            if(i < 0){
                throw new Error('Perfil não encotrado')
            }
            const perfisExcluidos = perfis.slice(i,1) //slice vai remover do valor de i até o numero de elmentos de 1
            return perfisExcluidos ? perfisExcluidos[0] : null
        },
    alterarPerfil(_,
        {filtro, dados}
        ){
            const i = indicePerfil(filtro)

            if(i < 0){
                throw new Error('Perfil não encontrado')
            }

            perfis[i].nome = dados.nome
            
            return perfis[i]

        }
}