const mongoose = require ('mongoose')

var Schema = mongoose.Schema 

var videoSchema = Schema({
    titulo: String,
    tipo: String,
    genero: String,
    sinopsis: String,
    clasificacion: String,
    temporada: {},
    imagen: String, 
    archivo: String
  
})


module.exports = mongoose.model('video', videoSchema, 'videoColeccion')
