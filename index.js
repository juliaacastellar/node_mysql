const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

//definindo o handlebars como templete
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
app.post('/delete', (req, res) =>{
    const {id} = req.body

    const sql = `
    DELETE FROM books
    WHERE id = ${id}
    `
    conn.query(sql, (error)=>{
        if (error){
            return console.log(error)
        }

        res.redirect('/')
    })
})


app.post('/edit/save', (req, res)=>{
    const {id, name, pageqty} = req.body

    const sql = `
    UPDATE books
    SET name = '${name}', pageqty = '${pageqty}'
    WHERE id = ${id}
    `
    conn.query(sql, (error)=>{
        if (error){
            return console.log(error)
        }

        res.redirect('/')
    })
})

app.post("/register/save", (req, res)=>{
    const {name, pageqty} = req.body

    const query = `
    INSERT INTO books (name, pageqty)
    VALUES ('${name}', '${pageqty}')
    `
    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }
    
        res.redirect("/")
    })
})

app.get('/edit/:id', (req, res)=>{
    const id = req.params.id
    
    const sql = `
    SELECT * FROM books
    WHERE id = ${id}
    `
    conn.query(sql, (error, data)=>{
        if (error) {
            return console.log(error)
        }
        const book = data[0]

        res.render("edit", {book})
    })
})
          
app.get('/book/:id', (req, res) =>{
    const id = req.params.id
    const sql = `
    SELECT * FROM books
    WHERE id=${id}
    `
    conn.query(sql, (error, data) => {
        if (error) {
            console.log(error)
            return
        }
        const book = data [0]
    
        res.render("book", {book})
    })
})

app.get("/", (req, res) => {
    const sql ='SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }
        const books = data

        res.render("home", {books})
    })
})

app.get("/register", (req, res) =>{
    res.render("register")
})





//conectar com o mysql
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodemysql',
    port: '3306'
})

conn.connect((error) => { 
    if (error) {
        console.log(error)
        return
    }
    console.log("Conectado ao MySQL")
    
    app.listen(3000, ()=> {
        console.log("Servidor rodando na porta 3000")
    })
})