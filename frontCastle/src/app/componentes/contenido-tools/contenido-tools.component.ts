import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/modelos/video';
import { VideoService } from 'src/app/servicios/video.service';

@Component({
  selector: 'app-contenido-tools',
  templateUrl: './contenido-tools.component.html',
  styleUrls: ['./contenido-tools.component.css']
})
export class ContenidoToolsComponent implements OnInit {
  tituloComponente:string;
  video:Video;
  videoCorrecto;
  cargarFichero:boolean;
  filesToUpload: File;
  actualizacionCorrecta:boolean;
  constructor(
    private _videoService:VideoService
  ) {
    this.video = new Video('','','','','','','','','','');
    this.cargarFichero = false;
    this.tituloComponente = "Crear video";
    this.actualizacionCorrecta=false;
   }
  ngOnInit() {
  }
  manejoVideo(){
    if(this.tituloComponente == "Crear video"){
      this.crearVideo();
    }else{
      this.actualizarVideo();
    } 
  }
  crearVideo(){
    this._videoService.crearVideo(this.video).subscribe(
      (response:any)=>{
        if(response.video){
          this.video = response.video;
          this.cargarFichero = true;
          this.tituloComponente = "Actualizar video";
          this.videoCorrecto = "El video se ha creado correctamente";
        }else{
          this.videoCorrecto = "No se ha podido crear el video, revisa el codigo T_T";
        }
      },error=>{
        if (error != null) {
          console.log(error)
        }
      }
    )
  }
  actualizarVideo(){
    this._videoService.cargarFicheroVideo(this.filesToUpload,this.video._id)
    .subscribe(
      (response:any)=>{
        if(response.video){
          this.actualizacionCorrecta = true;
          this.videoCorrecto = "Fichero cargado correctamente";
          setTimeout(()=>{
            this.reset();
          },3000)
        }else{
          this.videoCorrecto = "No se ha podido cargar el video, revisa el codigo :(";
        }
      },error=>{
         if (error != null) {
          console.log(error)
        }
      }
    )
  }
  reset(){
    this.video = new Video('','','','','','','','','','');
    this.cargarFichero = false;
    this.tituloComponente = "Crear video";
    this.videoCorrecto = undefined;
    this.actualizacionCorrecta = false;
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
  }
}
