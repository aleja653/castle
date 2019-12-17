'use strict'

//Lamamos a mongoose para hacer la conexión a la BD
const mongoose = require('mongoose')
const app = require('./app')
var port = 3977 /* comentario para prueba GitHub */

//.connect(parametro1,parametro2) nos permite la conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Castle',(err,res)=>{
    if(err){
        console.log('la prueba reina')
    }else{
        console.log("Conexión a la base de datos")
        //listen() --> forma para inicializar un servidor
        app.listen(port,()=>{
            console.log("Api escuchando en el puerto " + port)
            console.log(`Api escuchando en el puerto ${port}`)
        })
    }
})