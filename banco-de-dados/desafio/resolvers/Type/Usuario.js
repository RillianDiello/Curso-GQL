const db = require('../../config/db')


//Aqui foi utilizado um join, para unir duas tabelas
// http://knexjs.org/#Builder-join
module.exports = {
    async perfis(usuario) {
        return db('perfis')
            .join(
                'usuarios_perfis',
                'perfis.id',
                'usuarios_perfis.perfil_id'
            )
            .where({usuario_id: usuario.id})        
    }
}