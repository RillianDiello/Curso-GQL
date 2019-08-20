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
        args
        ){

        const emailExistentes = usuarios.some(u => u.email === args.email)

        if(emailExistentes){
            throw new Error('E-mail já cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)

        return novo
        
       
    },
    excluirUsuario(_, { id }){
        const i = usuarios.findIndex(u => u.id === id)
        if(i < 0){
            throw new Error('Usuario não encontrado')
        }
        const excluidos = usuarios.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },

    alterarUsuario(_, args){
        const i = usuarios.findIndex(u => u.id === args.id)

        if(i < 0){
            throw new Error('Usuario não encontrado')
        }

        const usuario = {
            ...usuarios[i],
            ...args
        }

        usuarios.splice(i,1,usuario)

        return usuario
        
    }
}