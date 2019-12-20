import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../modelos/video';
import { VideoService } from 
'../../servicios/video.service';
import { Usuario } from '../../modelos/usuarios';
import { CompartidoService } from
'../../servicios/compartido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slidercatalogo',
  templateUrl: './slidercatalogo.component.html',
  styleUrls: ['./slidercatalogo.component.css']
})
export class SlidercatalogoComponent implements OnInit {
  @Input() genero: string;// campo para filtrar genero
  video:Video;
  videos:Video[];
  existenVideos;  
  alertaVideos;
  avisoVideos;
  usuario:Usuario;
  
  url = "http://localhost:3977/api/obtener-imagen-video/"

  constructor(
    private _videoService:VideoService,
    private _servicioCompartido:CompartidoService,
    private _router: Router
  ) {
    this.existenVideos = false;
    this.usuario = JSON.parse(localStorage.getItem("sesion"));
   }

  ngOnInit() {
    this.cargarVideos();
  }

  cargarVideos(){

    this._videoService.obtenerVideos("/"+this.genero).subscribe(
      (response:any)=>{
        if(response.videos){
          console.log(response)
          this.videos = response.videos;
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

  agregarListaReproduccion(){
    this._videoService.obtenerVideo(this.video._id).subscribe(
      (response: any) => {
        if (response.video) {
          let videocargado = new Video(
            response.video._id,
            response.video.titulo,
            response.video.tipo,
            response.video.genero,
            response.video.sinopsis,
            response.video.clasificación,
            response.video.temporada,
            response.video.imagen,
            response.video.archivo
          )
            localStorage.setItem
            ("video",JSON.stringify(videocargado));
          }}
          )
  }




  eliminarVideo(video){
    this._videoService.eliminarVideo(video._id).subscribe(
      (response:any)=>{
        if(response.video){
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


