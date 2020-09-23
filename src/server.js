// instalar o npm init -y
//instalar o nodemon -D
const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended:true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache:true
})







// configurar caminhos da minha aplicação(dps de instalar o nunjuck usar o res.render)
//pagina inicial
server.get("/",(req,res) => {
   return res.render("index.html", {title:"Um titulo"})//enviando o diretorio html res.sendFile

})

server.get("/create-point",(req,res) => {
   //re.query: query strings da nossa urls

  
   
   
   return res.render("create-point.html")//enviando o diretorio html res.sendFile

})

server.post("/savepoint",(req,res)=>{
   //req.body: o  corpo do nosso formulario
   // console.log(req.body)
   const query =`
       INSERT INTO places (
           image,
           name,
           address,
           address2,
           state,
           city,
           items
           
       ) VALUES(
           ?,?,?,?,?,?,?);
       
       `
   
       const values = [
         req.body.image,
         req.body.name,
         req.body.address,
         req.body.address2,
         req.body.state,
         req.body.city,
         req.body.items

       ]
   
       function afterinsertdata(err){
           if(err){
               console.log(err)
               return res.send("Erro de cadastro!")
           }
              
           
           console.log("Cadastro Concluído")
           console.log(this)
       }
   
       
       db.run(query,values,afterinsertdata)
  
   return res.render("create-point.html",{saved:true})

   
})



server.get("/search-results",(req,res) => {
   const search = req.query.search
   if(search==""){
      //pesquisa vazia
      return res.render("search-results.html",{total:0})
   }

   //pegar os dados do banco de dados
   db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`, function(err,rows) {
              if(err){
                  return console.log(err)
              }
               const total = rows.length
               //mostrar a pagina html com os dados do banco de dados
               return res.render("search-results.html",{places: rows, total})
          })






})




//ligar o servidor

server.listen(3000)