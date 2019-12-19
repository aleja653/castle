'use strict'

//Trabajar con ficheros
var fs = require('fs');
var path = require('path');

const Video = require('../models/videoModel')

function crearVideo(req, res){
    var video = new Video()
    var params = req.body
    
    video.titulo = params.titulo
    video.duracion = params.duracion
    video.genero = params.genero
    video.sipnosis = params.sipnosis
    video.clasificacion = params.clasificacion
    video.imagen = params.imagen
    video.temporada = params.temporada
    video.capitulo = params.capitulo
   

    video.save()
        .then((videoGuardada) => {
            if (!videoGuardada) {
                res.status(404).send({ message: 'No se ha creado exitosamente el video' })
            } else {
                res.status(200).send({ video: videoGuardada })
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al guardar video' })
        })
}

function eliminarVideo(req,res){
    var idVideo = req.params.id

    Video.findByIdAndRemove(idVideo).exec()
    .then((videoEliminada)=>{
        if(!videoEliminada){
            res.status(404).send({message:'No se ha eliminado exitosamente el video'})
        }else{
            res.status(200).send({video:videoEliminada})
        }
    })
    .catch(err =>{
        res.status(500).send({message:'Error al eliminar video'})
    })
}


function obtenervideos(req,res){
    var genero= req.params.genero;
    Video.find({genero:genero},(err,videos)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"
            })
        }else{
            if(!videos){
                res.status(200).send({
                    message: "No se pudo obtener los videos"
                })
            }else{
                res.status(200).send({
                    videos:videos
                })
            }
        }
    })
}

 
function obtenerFicherovideo(req,res){
    //nombre fichero
    var videoFile = req.params.videoFile;
    //ruta archivo
    var path_file = './uploads/video/'+videoFile;
    //se comprueba si existe
    fs.exists(path_file,function(exists){
        if(exists){
            //devolvemos el video
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:"No existe el video"});
        }
    });
}

function cargarFicheroVideo(req,res){
    var idVideo = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if(file_ext == 'mp3'){
            Video.findByIdAndUpdate(idVideo,{archivo:file_name},(err,videoActualizada)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!videoActualizada){
                        res.status(404).send({message:'No se ha podido actualizar el video'});
                    }else{
                        //devuelve la video antes de actualizarse
                        videoActualizada.archivo = file_name;
                        res.status(200).send({video:videoActualizada});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Extension del archivo no correcta"});    
        }
    }else{
        res.status(200).send({message:"No ha subido ninguna video"});
    }
}

module.exports = {
    crearVideo,
    eliminarVideo,
    obtenerFicherovideo,
    cargarFicheroVideo,
    obtenervideos
}

