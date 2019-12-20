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

  PlaylistInLocalStorage; constructor(
    private _VideoService: VideoService,
    private _route: ActivatedRoute,
  ) {
    this.video = new Video("", "Game of Thrones", "", "", "", "", "", "el trono de fuego", "../../../assets/Game of Thrones _ Season 8 _ Official Trailer (HBO).mp4");
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      console.log(id);
      this._VideoService.obtenerVideo(id).subscribe(
        (response:any)=>{
          console.log(response)
        },error =>{
          console.log(error)
        }
      )
    })
  }




}
