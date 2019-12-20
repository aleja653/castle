import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/modelos/video';
import { VideoService } from 'src/app/servicios/video.service'
import { CompartidoService } from 'src/app/servicios/compartido.service';
import { identifierModuleUrl } from '@angular/compiler';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  url = "http://localhost:3977/api//obtener-fichero-video"
  
  video: Video;
  indiceVideo = 0;
  videoActual;
  AvisoVideo;
  existenVideo;  
  alertaVideo;

  PlaylistInLocalStorage; constructor(
    private _VideoService: VideoService,
    private _route: ActivatedRoute,
  ) {
    // this.video = new Video("", "", "", "", "", "", "", "","");
    this.video = JSON.parse(localStorage.getItem('video'));
  }

  ngOnInit() {}
  
    
  cargarVideo(){

    this._VideoService.obtenerVideo("/"+this.video._id).subscribe(
      (response:any)=>{
        if(response.video){
          console.log(response)
          this.video = response.video;
          this.existenVideo = true;
        }else{
          this.alertaVideo = `No se pudieron cargar 
          los videos, contacte al 
          administrador de la aplicacion`;
        }
        // localStorage.setItem("playlist",JSON.stringify(playlist));
      },error=>{
        if (error != null) {
          console.log(error)  
        }
      }
    )
  }




}
