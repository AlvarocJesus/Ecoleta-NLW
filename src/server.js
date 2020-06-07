const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db");

//configurar pasta publica
server.use(express.static("public"));

//habilitar o uso do req.body na aplicacao
server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


//configurar caminhos da aplicacao
server.get("/", (req, res) => {
    return res.render('index.html'); //, { title: 'Um título' }
})

server.get("/create-point", (req, res) => {
    // req.query: Query Strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html");
})

server.post("/savepoint", (req, res) => {
    //req.body: corpo do nosso formulario
    // console.log(req.body);

    //inserir dados no banco de dados
    const query = `
        insert into places(
            image, 
            name, 
            addres, 
            addres2, 
            state, 
            city, 
            itens
        ) values (?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.addres,
        req.body.addres2,
        req.body.state,
        req.body.city,
        req.body.itens
    ];

    function afterInsertData(err) {
        if(err) {
            console.log(err);
            return res.send("Erro")
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render('create-point.html', {saved: true});
    };

    db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
    const search = req.query.search;

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 });
    }


    //pegar dados do banco de dados
    db.all(`select * from places where city like '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        const total = rows.length;

        //mostrar a pagina html com os dados do html
        return res.render("search-results.html", { places: rows, total: total });

    });
})

// ligar o servidor
server.listen(3000);