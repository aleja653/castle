const mongoose = require ('mongoose')

var Schema = mongoose.Schema 

var videoSchema = Schema({
    titulo: String,
    duracion: String,
    genero: String,
    sinopsis: String,
    clasificacion: String,
    temporada: String,
    capitulo: String,  
    archivo: String
  
})

module.exports = mongoose.model('video', videoSchema, 'videoColeccion')
