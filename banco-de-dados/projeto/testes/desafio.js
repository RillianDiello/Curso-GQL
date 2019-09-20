const db = require('../config/db')

async function salvarUsuario(nome, email, senha){

    let novoUsario = {
        nome: nome,
        email: email,
        senha: senha
    }
   
    let usuario = await db('usuarios').where({email}).first()
    if(!usuario){                  

        let [ id ] = await db('usuarios').insert(novoUsario)
        
        usuario = await db('usuarios').where({id }).first()
    }else{
        await db('usuarios')
            .where({id: usuario.id })
            .update(novoUsario)
        usuario = {...usuario, nome, email,senha}
    }

    return usuario

}

async function salvarPerfil(nome, rotulo){

    let novoPerfil = {
        nome: nome,
        rotulo: rotulo
    }
   
    let perfil = await db('perfis').where({nome}).first()
    if(!perfil){                  

        let [ id ] = await db('perfis').insert(novoPerfil)
        
        perfil = await db('perfis').where({id }).first()
    }else{
        await db('perfis')
            .where({id: perfil.id })
            .update(novoPerfil)
        perfil = {...perfil, nome, rotulo}
    }

    return perfil
}

async function adicionarPerfil(usuario, ...perfis){

    const usuario_id = usuario.id

    await db('usuarios_perfis')
    .where({ usuario_id})
    .delete()

    for(perfil of perfis){
        const perfil_id = perfil.id        
        await db('usuarios_perfis').insert({usuario_id,perfil_id})
    }

}

async function executar(){
    const usuario = await salvarUsuario('Ana', 'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh', 'Recursos Humanos')
    const perfilB = await salvarPerfil('fin', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfil(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally (() => db.destroy())
