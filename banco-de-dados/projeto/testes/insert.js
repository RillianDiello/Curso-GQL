const db = require('../config/db')

// const novoPerfil = {
//     nome: 'visitante',
//     rotulo: 'Visitante'
// }
// //esse comando consegue inserir e retorna uma promisse
// db('perfis').insert(novoPerfil)
//     .then(res => console.log(res))
//     .catch(err => console.log(err.sqlMessage))
//     .finally(() => db.destroy()) //

const perfilSU = {
    nome: 'root' + Math.random(),
    rotulo: 'Super Usuario'
}

//Quando trabalha com promisse podemos encadear varios thens, tal que o proximo then recebe como parametro o vaor do anterior
db.insert(perfilSU).into('perfis')
    .then(res => res[0])
    .then(id => `O codigo gerado foi ${id}`)
    .then(string => console.log(string))    
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy()) 