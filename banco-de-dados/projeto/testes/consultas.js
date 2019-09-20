const db = require('../config/db')

// db('perfis')
//     .then(res => res.map(p => p.nome))
//     .then(nomes => console.log(nomes))
//     .finally(() => db.destroy())

//opção fornecida pelo knex
// db('perfis')
//     .map(p => p.nome)
//     .then(nomes => console.log(nomes))
//     .finally(() => db.destroy())

// db('perfis').select('nome', 'id')
// .then(res => console.log(res))
// .finally(() => db.destroy())

// db('perfis').select('nome', 'id')
//     .from('perfis')
//     .limit(5).offset(2)
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// Traz um array como resposta
// db('perfis')
//     .where({id: 2})
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// Traz um elemento como resposta ond eu posso especificar um campo expecifico
// db('perfis')
//     .where({id: 2})
//     .first()
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

a = 'admin'

db('perfis')
    .where('nome', 'like', a)
    .first()
    .then(res => console.log(res))
    .finally(() => db.destroy())




//Exemplos de Wheres suportados
// db('perfis')
//     .where({id: 2})
//     .where('id', '=', 2)
//     .where('nome', 'like', "%min%")
//     .whereNot({id:2})
//     .whereIn('id', [1,2,3])
//     .first()
//     .then(res => console.log(res.nome))
//     .finally(() => db.destroy())