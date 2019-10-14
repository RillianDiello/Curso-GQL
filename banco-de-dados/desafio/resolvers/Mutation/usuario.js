const db = require('../../config/db')

const {usuario: obterUsuario} = require('../Query/usuario')

const {perfil: obterPerfil} = require('../Query/perfil')

module.exports = {
    async novoUsuario(_, { dados }) {
        try{

            const idsPerfis = []
            
            // AO inserir um usuario eu preciso saber se ele está sendo associado
            // a algum perfil , para que eu possa fazer essa inserção
            if(dados.perfis){
                for(let filtro of dados.perfis){
                    const perfil = await obterPerfil(_,{filtro})
                    if(perfil){
                        idsPerfis.push(perfil.id)
                    }
                }
            }

            // Isso é feito pois perfis não é uma coluna valida da tabela usuarios

            delete dados.perfis
            const [ id ] = await db('usuarios')
                            .insert( {...dados} )            

            // Agora será inserida a relação
            for(perfil_id of idsPerfis){
                await db('usuarios_perfis').insert({perfil_id, usuario_id: id})                
            }

            return db('usuarios').where({id}).first()
        }catch(e){
            throw new Error(e)
        }
        
    },
    async excluirUsuario(_, args) {
        try{
            const usuario = await obterUsuario(_, args )

            if(usuario){
                const { id } = usuario

                await db('usuarios_perfis')
                .where({ usuario_id: id }).delete()               
            
            await db('usuarios')
                .where({id}).delete()

            return usuario
            }
        }catch(e){
            throw new Error(e.sqlMessage) 
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {
            /*
            Para alterar um usuario prieiro preciso obter ele e garantir que existe
            Então eu vou deletar todos os relacionamnto que ele possui com usuarios_perfis
            E depois vou construir um conjunto contendo todos os relacionamentos que
            devem ser inseridos apos o uptdate do usuario
             */
            const usuario = await obterUsuario(_,{ filtro })
            
            
            
            if(usuario){
                const { id } = usuario
                
                if(dados.perfis){
                    await db('usuarios_perfis').where({ usuario_id: id}).delete()
                    
                    
                    for(let filtro of dados.perfis){

                        const perfil = await obterPerfil(_,{filtro})
                        // Aqui eu posso inserir o perfil direto pois o usuario já esta 
                        // inserido na base de dados, eu estou apenas editar suas informações
                        if(perfil){
                            await db('usuarios_perfis').insert({
                                perfil_id: perfil.id,
                                usuario_id: id
                            })
                        }
                        
                    }
                }

                //Tenho q remover os perfis da variavel dados para poder
                //passa-la direto como parametro para o update
                delete dados.perfis

                await db('usuarios').where({id}).update(dados)
            }
            return !usuario ? null : {...usuario, ...dados}
        }catch(e){
            throw new Error(e) 
        }
    }
}