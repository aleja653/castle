import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/modelos/video';
import { VideoService } from 'src/app/servicios/video.service';
import { Usuario } from 'src/app/modelos/usuarios';
import { CompartidoService } from 'src/app/servicios/compartido.service';

@Component({
  selector: 'app-lista-contenido',
  templateUrl: './lista-contenido.component.html',
  styleUrls: ['./lista-contenido.component.css']
})
export class ListaContenidoComponent implements OnInit {
  videos:Video[];
  existenVideos;
  alertaVideos;
  avisoVideos;
  usuario:Usuario;
  genero;

  constructor(
    private _videoService:VideoService,
    private _servicioCompartido:CompartidoService
  ) {
    this.existenVideos = false;
    this.usuario = JSON.parse(localStorage.getItem("sesion"));
   }

  ngOnInit() {
    this.cargarVideos();
  }

  cargarVideos(){
    this._videoService.obtenerVideos(this.genero).subscribe(
      (response:any)=>{
        if(response.videos){
          this.videos = response.videos;
          this.existenVideos = true;
        }else{
          this.alertaVideos = `No se pudieron cargar los videos, contacte al administrador de la aplicacion`;
        }
      },error=>{
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

  agregarListaReproduccion(video){
    this.avisoVideos= "video agregado al reproductor";
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
    this._videoService.eliminarVideo(video._id).subscribe(
      (response:any)=>{
        if(response.video){
          this.avisoVideos = "video eliminado";
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

/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-contenido',
  templateUrl: './lista-contenido.component.html',
  styleUrls: ['./lista-contenido.component.css']
})
export class ListaContenidoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

} */
