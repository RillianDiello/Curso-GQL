const db = require('../../config/db')


//Aqui foi utilizado um join, para unir duas tabelas
// http://knexjs.org/#Builder-join
module.exports = {
    usuarios(perfil) {
        return db('usuarios')
            .join(
                'usuarios_perfis',
                'usuarios.id',
                'usuarios_perfis.usuario_id'
            )
            .where({perfil_id: perfil.id})        
    }
}