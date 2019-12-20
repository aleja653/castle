import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/modelos/video';
import { VideoService } from 'src/app/servicios/video.service';

@Component({
  selector: 'app-contenido-tools',
  templateUrl: './contenido-tools.component.html',
  styleUrls: ['./contenido-tools.component.css']
})
export class ContenidoToolsComponent implements OnInit {
  tituloComponente: string;
  video: Video;
  videoCorrecto;
  cargarFichero: boolean;
  filesToUploadImage: File;
  filesToUploadVideo: File;
  actualizacionCorrecta: boolean;
  numerocapitulo;
  numeroTemporada;
  opciont="Crear";
  constructor(
    private _videoService: VideoService
  ) {
    this.video = new Video('', '', '', '', '', '', '', '', '');
    this.cargarFichero = false;
    this.tituloComponente = "Crear video";
    this.actualizacionCorrecta = false;
  }
  ngOnInit() {
  }

  crearVideo() {
    if (this.opciont=="Crear"){
      this._videoService.crearVideo(this.video).subscribe(
        (response: any) => {
          if (response.video) {
            this.video._id = response.video._id;
            this._videoService.cargarImagenVideo(this.filesToUploadImage, this.video._id).subscribe(
              (response: any) => {
                if(this.video.tipo == "serie"){
                  this._videoService.cargarFicheroSerie(this.filesToUploadVideo
                    ,this.video._id,this.numeroTemporada,this.numerocapitulo).subscribe(
                      (response:any)=>{
                        console.log(response)
                      }, error=>console.log(error)
                  )
                }
                else{
                  this._videoService.cargarFicheroPelicula(this.filesToUploadVideo,this.video._id).subscribe(
                    (response: any)=>{
                      console.log(response)
                    }, error=>console.log(error)
                  )
  
                }
              }, error => {
                console.log(error)
              }
            )
          } else { console.log("Error al crear la canción") }
        }, error => {
          console.log(error)
        }
  
  
      )
    }else{
      this._videoService.cargarFicheroSerie(this.filesToUploadVideo
        ,this.video._id,this.numeroTemporada,this.numerocapitulo).subscribe(
          (response:any)=>{
            console.log(response)
          }, error=>console.log(error)
      )
    }
    
  }

  reset() {
    this.video = new Video('', '', '', '', '', '', '', '', '');
    this.cargarFichero = false;
    this.tituloComponente = "Crear video";
    this.videoCorrecto = undefined;
    this.actualizacionCorrecta = false;
  }
  fileChangeEventImage(fileInput: any) {
    this.filesToUploadImage = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
  }
  fileChangeEventVideo(fileInput: any) {
    this.filesToUploadVideo = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
  }
}
