'use strict'
const app = require('express')

var videoController = require('../controllers/videoController');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/video'});

var api = app.Router()

 api.post('/video',videoController.crearVideo);
 api.delete('/video/:id',videoController.eliminarVideo);
 api.get('/videos/:genero', videoController.obtenervideos);// lista los videos por genero
 api.post('/cargar-fichero-video/:id', md_upload,videoController.cargarFicheroVideo);
 api.get('/obtener-fichero-video/:videoFile', md_upload,videoController.obtenerFicherovideo);

 module.exports = api