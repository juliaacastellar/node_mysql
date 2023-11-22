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

app.get('/', req, res => {
    res.render("home")
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