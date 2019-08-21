const {usuarios, proximoId} = require('../data/db')


function indiceUsuario(filtro){
    if(!filtro) return -1
    const {id, email} = filtro
    if(id){
        return usuarios.findIndex(u => u.id === id)
    }else if(email){
        return usuarios.findIndex(u => u.email === email)
    }

    return -1
}
module.exports = {
    novoUsuario(_, 
        // {nome, email, idade}
        {dados}
        ){

        const emailExistentes = usuarios.some(u => u.email === dados.email)

        if(emailExistentes){
            throw new Error('E-mail já cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)

        return novo
        
       
    },
    excluirUsuario(_, { filtro }){
        const i = indiceUsuario(filtro)
        if(i < 0){
            throw new Error('Usuario não encontrado')
        }
        const excluidos = usuarios.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },

    alterarUsuario(_, {filtro, dados}){
        const i = indiceUsuario(filtro)

        if(i < 0){
            throw new Error('Usuario não encontrado')
        }

        usuarios[i].nome = dados.nome
        usuarios[i].email = dados.email
        
        if(dados.idade){
            usuarios[i].idade = dados.idade
        }
        
        return usuarios[i]
        
    }
}