import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// cliente http hacer peticiones al backend
import { map } from 'rxjs/operators';//mapear darles una organización a los objetos cuando la traemos del backend
//Se importa map, libreria para mapear objetos
import { Observable } from 'rxjs'
//Recoger respuestas de cuando hacemos una peticion ajax al servidor


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  url = "http://localhost:3977/api/";
  constructor(
    private _http: HttpClient
    ) { }

  crearVideo(video) {
    let params = JSON.stringify(video);
    let options = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' })};
    return this._http.post(
      this.url + "video",
      params,
      options
    ).pipe(map(res => res));
  }

  eliminarVideo(id) {
    let options = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'
        })
    };
    return this._http.delete(
      this.url + 'video/' + id,
      options
    ).pipe(map(res => res));
  }

  //Cargar fichero canción
  cargarFicheroVideo(file: File, id) {
    var formData = new FormData();
    formData.append('song', file);
    return this._http.post(
      this.url + "cargar-fichero-video/" + id,
      formData
    ).pipe(map(res => res));
  }

 //Obtener Videos
obtenerVideos(genero){
  
  let options = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' })};
     return this._http.get(
     this.url + "/videos" + genero,
     options
  ).pipe(map(res => res));
}

}
