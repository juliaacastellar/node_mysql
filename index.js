const express = require('express')
const exphbs = require('express-handlebars')
const mysql2 = require('mysql2')

const app = express(
)

//definindo o hendlebars como templete
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//pasta de arquivos estaticos como css, imagens
app.use(express.static('public'))

//trabalhar com dados no formato json
app.use(express.urlencoded({
    extended: true 
}))

app.use(express.json())

//rotas

app.post("/register/save", req, res =>{
    const {title, pageqty} = request.body

    const query = `
    INSERT INTO books (title, pageqty)
    VALUES ('${title}', '${pageqty})
    `
    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }
        response.redirect("/")
    })
})

app.get("/", req, res => {
    const sql ='SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }
        const books = data

        console.log(books)

        res.render("home", {books})
    })
})

app.get("/register", req, res =>{
    res.render("register")
})



//conectar com o mysql
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
    port: '3306'
})

conn.connect((error) => { 
    if (error) {
        console.log(error)
        return
    }
    console.log("conectado ao MySQL")
    
    app.listen(3000, ()=> {
        console.log("servidor rodando na porta 3000")
    })
})