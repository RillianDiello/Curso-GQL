const db = require('../../config/db')

const {perfil: obterPerfil} = require('../Query/perfil')

module.exports = {
    async novoPerfil(_, { dados }) {        
        // implementar
        try{
            const [ id ] = await db('perfis')
                            .insert({...dados})// operador spread

            return db('perfis').where({id}).first()
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },

    //Necessário tomar cuidado com os relacionamento estrangeiros
    async excluirPerfil(_, args) {
        // implementar
        try{
            
            const perfil = await obterPerfil(_,args)           
            
            //delete cascade = deleta todas as referencias
            if(perfil){
                const { id } = perfil
                
                //deleta todos os registro de relacionamento
                await db('usuario_perfil')
                    .where({ perfil_id: id }).delete()               
                
                await db('perfis')
                    .where({id}).delete()

                return perfil
            }
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        // implementar
        try{
            
            const perfil = await obterPerfil(_,{ filtro })           
                   
            console.log(perfil)
            if(perfil){
                const { id } = perfil
                                
                await db('perfis')
                    .where({id}).update(dados)
            }
            return {...perfil, ...dados} //mesclando os dados que eu recebi com oq eu tenho
            
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    }
}