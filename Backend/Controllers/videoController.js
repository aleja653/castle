'use strict'

//Trabajar con ficheros
var fs = require('fs');
var path = require('path');

const Video = require('../Models/videoModel');

function crearVideo(req, res) {
    var video = new Video()
    var params = req.body

    video.titulo = params.titulo
    video.tipo = params.tipo
    video.genero = params.genero
    video.sipnosis = params.sipnosis

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

function eliminarVideo(req, res) {
    var idVideo = req.params.id

    Video.findByIdAndRemove(idVideo).exec()
        .then((videoEliminada) => {
            if (!videoEliminada) {
                res.status(404).send({ message: 'No se ha eliminado exitosamente el video' })
            } else {
                res.status(200).send({ video: videoEliminada })
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al eliminar video' })
        })
}


function obtenervideos(req, res) {
    var genero = req.params.genero;
    Video.find({ genero: genero }, (err, videos) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"
            })
        } else {
            if (!videos) {
                res.status(200).send({
                    message: "No se pudo obtener los videos"
                })
            } else {
                res.status(200).send({
                    videos: videos
                })
            }
        }
    })
}


function obtenerFicherovideo(req, res) {
    //nombre fichero
    var videoFile = req.params.videoFile;
    //ruta archivo
    var path_file = './uploads/video/' + videoFile;
    //se comprueba si existe
    fs.exists(path_file, function (exists) {
        if (exists) {
            //devolvemos el video
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe el video" });
        }
    });
}

function cargarFicheroPelicula(req, res) {
    var idVideo = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if (req.files) {
        var file_path = req.files.archivo.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if (file_ext == 'mp4') {
            Video.findByIdAndUpdate(idVideo, { archivo: file_name }, (err, videoActualizada) => {
                if (err) {
                    res.status(500).send({ message: 'Error en el servidor' });
                } else {
                    if (!videoActualizada) {
                        res.status(404).send({ message: 'No se ha podido actualizar el video' });
                    } else {
                        //devuelve la video antes de actualizarse
                        videoActualizada.archivo = file_name;
                        res.status(200).send({ video: videoActualizada });
                    }
                }
            });
        } else {
            res.status(200).send({ message: "Extension del archivo no correcta" });
        }
    } else {
        res.status(200).send({ message: "No ha subido ninguna video" });
    }
}

function cargarFicheroSerie(req, res) {
    var idVideo = req.params.id;
    var numeroTemporada = req.params.temporada;
    var capitulo = req.params.capitulo;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if (req.files) {
        var file_path = req.files.archivo.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if (file_ext == 'mp4') {

            Video.findById(idVideo).then(
                (videoObtenido) => {
                    if (videoObtenido) {
                        console.log(videoObtenido)
                        if (videoObtenido.temporada == undefined) {
                            videoObtenido.temporada = {}
                        }
                        if (videoObtenido.temporada[numeroTemporada] == undefined) {
                            videoObtenido.temporada[numeroTemporada] = {}
                        }
                        videoObtenido.temporada[numeroTemporada][capitulo] = file_name;
                        console.log(videoObtenido)
                        Video.findByIdAndUpdate(idVideo, videoObtenido, (err, videoActualizada) => {
                            if (err) {
                                console.log(error)
                                res.status(500).send({ message: 'Error en el servidor' });
                            } else {
                                if (!videoActualizada) {
                                    res.status(404).send({ message: 'No se ha podido actualizar el video' });
                                } else {
                                    //devuelve la video antes de actualizarse
                                    res.status(200).send({ video: videoObtenido });
                                }
                            }
                        });
                    }
                }
            ).catch(
                error=>{
                    console.log(error)
                    res.status(500).send({ message: 'Error en el servidor' })
                }
               
            )

        } else {
            res.status(200).send({ message: "Extension del archivo no correcta" });
        }
    } else {
        res.status(200).send({ message: "No ha subido ninguna video" });
    }
}



function cargarImagenVideo(req, res) {
    var idVideo = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Video.findByIdAndUpdate(idVideo, { imagen: file_name }, (err, videoActualizado) => {
                if (err) {
                    res.status(500).send({ message: 'Error en el servidor' });
                } else {
                    if (!videoActualizado) {
                        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                    } else {
                        //devuelve usuario antes de actualizarse
                        videoActualizado.imagen = file_name;
                        res.status(200).send({ video: videoActualizado });
                    }
                }
            });
        } else {
            res.status(200).send({ message: "Extension del archivo no correcta" });
        }
    } else {
        res.status(200).send({ message: "No ha subido ninguna imagen" });
    }
}

function obtenerImagenVideo(req,res){
    //nombre fichero
    var imageFile = req.params.imageFile;
    //ruta archivo
    var path_file = './uploads/video/'+imageFile;
    //se comprueba si existe
    fs.exists(path_file,function(exists){
        if(exists){
            //devolvemos la imagen
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:"No existe imagen"});
        }
    });
}

function obtenerVideo(req,res){
    var id = req.params.id;

    Video.findById(id)
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

module.exports = {
    crearVideo,
    eliminarVideo,
    obtenerFicherovideo,
    cargarFicheroPelicula,
    obtenervideos,
    cargarImagenVideo,
    cargarFicheroSerie,
    obtenerImagenVideo,
    obtenerVideo
}

