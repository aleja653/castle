'use strict'
const app = require('express')

var videoController = require('../Controllers/videoController');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/video'});

var api = app.Router()

 api.post('/video',videoController.crearVideo);
 api.delete('/video/:id',videoController.eliminarVideo);
 api.get('/videos/:genero', videoController.obtenervideos);// lista los videos por genero
 api.post('/cargar-fichero-pelicula/:id', md_upload,videoController.cargarFicheroPelicula);
 api.get('/obtener-fichero-video/:videoFile', md_upload,videoController.obtenerFicherovideo);
 api.post('/cargar-imagen-video/:id', md_upload,videoController.cargarImagenVideo);
 api.post('/cargar-fichero-serie/:id&:temporada&:capitulo', md_upload,videoController.cargarFicheroSerie);
 api.get('/obtener-imagen-video/:imageFile',md_upload,videoController.obtenerImagenVideo);
 api.get('/video/:id', videoController.obtenervideo);
 

 module.exports = api