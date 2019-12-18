'use strict'
const app = require('express')
var videoController = require('../controllers/videoController');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/videos'});
var api = app.Router()
 api.post('/video',videoController.crearvideo);
 api.delete('/video/:id',videoController.eliminarvideo);
 api.get('/videos/:genero', videoController.obtenervideos);
 api.post('/cargar-fichero-video/:id', md_upload,videoController.cargarFicherovideo);
 api.get('/obtener-fichero-video/:videoFile', md_upload,videoController.obtenerFicherovideo);
 module.exports = api