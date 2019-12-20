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
  cargarFicheroPelicula(file: File, id) {
    var formData = new FormData();
    formData.append('archivo', file);
    return this._http.post(
      this.url + "cargar-fichero-pelicula/" + id,
      formData
    ).pipe(map(res => res));
  }

  cargarFicheroSerie(file: File, id,numeroTemporada,capitulo) {
    var formData = new FormData();
    formData.append('archivo', file);
    return this._http.post(
      this.url + "cargar-fichero-serie/" + id + "&" + numeroTemporada + "&" + capitulo,
      formData
    ).pipe(map(res => res));
  }





 //Obtener Videos con genero
obtenerVideos(genero){
  
  let options = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' })};
     return this._http.get(
     this.url + "videos" + genero,
     options
  ).pipe(map(res => res));
}

obtenerVideo(id){
  let options = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' })};
     return this._http.get(
     this.url + "video/" + id,
     options
  ).pipe(map(res => res));
}

/* obtenerVideos(){
  
  let options = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' })};
     return this._http.get(
     this.url + "/videos",
     options
  ).pipe(map(res => res));
} */

cargarImagenVideo(file: File, id) {
  var formData = new FormData();
  formData.append('image', file);
  return this._http.post(
    this.url + "cargar-imagen-video/" + id,
    formData
  ).pipe(map(res => res));
}



}
