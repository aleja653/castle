import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../modelos/video';
import { VideoService } from 
'../../servicios/video.service';
import { Usuario } from '../../modelos/usuarios';
import { CompartidoService } from
'../../servicios/compartido.service';

@Component({
  selector: 'app-slidercatalogo',
  templateUrl: './slidercatalogo.component.html',
  styleUrls: ['./slidercatalogo.component.css']
})
export class SlidercatalogoComponent implements OnInit {
  @Input() genero: string;// campo para filtrar genero

  videos:Video[];
  existenVideos;
  alertaVideos;
  avisoVideos;
  usuario:Usuario;

  constructor(
    private _cancionService:VideoService,
    private _servicioCompartido:CompartidoService
  ) {
    this.existenVideos = false;
    this.usuario = JSON.parse(localStorage.getItem("sesion"));
   }

  ngOnInit() {
    this.cargarVideos();
  }

  cargarVideos(){
    this._cancionService.obtenerVideos(this.genero).subscribe(
      (response:any)=>{
        if(response.videos){
          this.videos = response.canciones;
          this.existenVideos = true;
        }else{
          this.alertaVideos = `No se pudieron cargar 
          los videos, contacte al 
          administrador de la aplicacion`;
        }
      },error=>{
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

  agregarListaReproduccion(video){
    this.avisoVideos= "video agregada al reproductor";
    var playlist = [];
    if(localStorage.getItem("playlist") != null){
      playlist = JSON.parse(localStorage.getItem("playlist"))
      playlist.push(video)
    }else{
      playlist.push(video)
    }
    localStorage.setItem("playlist",JSON.stringify(playlist));
    this._servicioCompartido.emitirVideo(video);
  }

  eliminarVideo(video){
    this._cancionService.eliminarVideo(video._id).subscribe(
      (response:any)=>{
        if(response.cancion){
          this.avisoVideos = "Video eliminado";
          this.cargarVideos();
        }else{
          this.avisoVideos = 
          "El video no se elimino, revisa el codigo :(";
        }
      },error=>{
         if (error != null) {
          console.log(error)
        }
      }
    )
  }


}


