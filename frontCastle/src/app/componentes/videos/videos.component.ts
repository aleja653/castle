import { Component, OnInit } from '@angular/core';
import {Video} from 'src/app/modelos/video';
import {VideoService} from 'src/app/servicios/video.service'
import { CompartidoService } from 'src/app/servicios/compartido.service';
import { identifierModuleUrl } from '@angular/compiler';

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

  PlaylistInLocalStorage; constructor(
    private _serviciocompartido: CompartidoService
  ) {
   this.video = new Video ( "", "Game of Thrones", "","","","","","el trono de fuego","","../../../assets/Game of Thrones _ Season 8 _ Official Trailer (HBO).mp4");
   } ngOnInit() {
    
  } 

}
