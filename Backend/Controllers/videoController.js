'use strict'

//Trabajar con ficheros
var fs = require('fs');
var path = require('path');

const video = require('../models/videoModel')

function crearvideo(req, res){
    var video = new video()
    var params = req.body
    
    video.titulo = params.titulo
    video.duracion = params.duracion
    video.genero = params.genero
    video.sipnosis = params.sipnosis
    video.clasificacion = params.clasificacion
    video.temporada = params.temporada
    video.capitulo = params.capitulo
   

    video.save()
        .then((videoGuardada) => {
            if (!videoGuardada) {
                res.status(404).send({ message: 'no se ha creado exitosamente la video' })
            } else {
                res.status(200).send({ video: videoGuardada })
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al guardar video' })
        })
}

function eliminarvideo(req,res){
    var idvideo = req.params.id

    video.findByIdAndRemove(idvideo).exec()
    .then((videoEliminada)=>{
        if(!videoEliminada){
            res.status(404).send({message:'no se ha eliminado exitosamente la video'})
        }else{
            res.status(200).send({video:videoEliminada})
        }
    })
    .catch(err =>{
        res.status(500).send({message:'Error al eliminar video'})
    })
}

function obtenervideos(req,res){
    video.find((err,videos)=>{
        if(err){
            res.status(500).send({message: "error en el servidor"
            })
        }else{
            if(!videos){
                res.status(200).send({
                    message: "no se pudo obtener las videos"
                })
            }else{
                res.status(200).send({
                    videoes:videos
                })
            }
        }
    })
}
 
function obtenerFicherovideo(req,res){
    //nombre fichero
    var videoFile = req.params.videoFile;
    //ruta archivo
    var path_file = './uploads/videoes/'+songFile;
    //se comprueba si existe
    fs.exists(path_file,function(exists){
        if(exists){
            //devolvemos la video
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:"no existe el video"});
        }
    });
}

function cargarFicherovideo(req,res){
    var idvideo = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if(req.files){
        var file_path = req.files.song.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if(file_ext == 'mp3'){
            video.findByIdAndUpdate(idvideo,{archivo:file_name},(err,videoActualizada)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!videoActualizada){
                        res.status(404).send({message:'No se ha podido actualizar la video'});
                    }else{
                        //devuelve la video antes de actualizarse
                        videoActualizada.archivo = file_name;
                        res.status(200).send({archivo:videoActualizada});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Extension del archivo no correcta"});    
        }
    }else{
        res.status(200).send({message:"no ha subido ninguna video"});
    }
}


module.exports = {
    crearvideo,
    eliminarvideo,
    obtenerFicherovideo,
    cargarFicherovideo,
    obtenervideoes
}

