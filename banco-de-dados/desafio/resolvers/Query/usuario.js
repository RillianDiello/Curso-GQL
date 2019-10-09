const db = require('../../config/db')

module.exports = {
    async usuarios() {
        // implementar
        return db('usuarios')
    },
    async usuario(_, { filtro }) {
        // primeiro verifico se o filtro existe
        // depois verifico se o filtro é id ou nome
        if(!filtro) return null

        const {id, email} = filtro
        if(id){
            return db('usuarios')
                .where({id})
                .first()
        }else if(email){
            return db('usuarios')
                .where({email})
                .first() // First pq estamos assumindo que todos os nomes devem ser diferentes
        }else{
            return null
        }
    },
}