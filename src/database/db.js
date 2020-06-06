//importa a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o obj de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//utilizar o obj de banco de dados, para nossas operacoes
// db.serialize(() => {
//     //com comandos sql vou:

//     // //1 criar uma tabela
//     // db.run(`
//     //     create table if not exists places (
//     //         id integer primary key autoincrement,
//     //         name text,
//     //         image text, 
//     //         addres text,
//     //         addres2 text,
//     //         state text,
//     //         city text,
//     //         itens text
//     //     );
//     // `)

//     // //2 inserir dados na tabela
//     // const query = `
//     //     insert into places(
//     //         image, 
//     //         name, 
//     //         addres, 
//     //         addres2, 
//     //         state, 
//     //         city, 
//     //         itens
//     //     ) values (?, ?, ?, ?, ?, ?, ?);
//     // `
//     // const values = [
//     //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     //     "Papersider",
//     //     "Guilherme Genballa, Jardim América",
//     //     "Numero 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Residuos eletronicos, Lampadas"
//     // ]

//     // function afterInsertData(err) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }

//     //     console.log("Cadastrado com sucesso");
//     //     console.log(this);
//     // };

//     // db.run(query, values, afterInsertData);

//     //3 consultar dados na tabela
//     // db.all(`select name from places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }

//     //     console.log('Aqui estao seus registros');
//     //     console.log(rows);
//     // });

    // 4 deletar um dado da tabela
    // db.run(`delete from places where id=?`, [3], function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log('Registro deletado com sucesso!');
    // });

// });
