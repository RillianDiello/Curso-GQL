const db = require('../../config/db')

module.exports = {
    async perfis() {
        // REtorna todos os dados
        return db('perfis')
        
    },
    async perfil(_, { filtro }) {
       
        if(!filtro) return null

        const {id, nome} = filtro
        
        if(id){
            return db('perfis')
                .where({id})
                .first()
        }else if(nome){
            return db('perfis')
                .where({nome})
                .first() // First pq estamos assumindo que todos os nomes devem ser diferentes
        }else{
            return null
        }
        
    }
}