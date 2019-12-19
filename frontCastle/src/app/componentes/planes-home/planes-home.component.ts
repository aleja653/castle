import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuarios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';@Component({
  selector: 'app-planes-home',
  templateUrl: './planes-home.component.html',
  styleUrls: ['./planes-home.component.css']
})
export class PlanesHomeComponent implements OnInit {
  usuario: Usuario;
  filesToUpload: File;
  actualizacionCorrecta;
  varCambiar;
  url = "http://localhost:3977/api/";  constructor(
    private _usuarioService: UsuarioService
  ) { }  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("sesion"))
  }  mostrar_boton_sus() {
    if (this.usuario.role == null) {
      this.varCambiar = null;
    } else {      this.varCambiar = "this.usuario.role";
    }
  }
  actualizarDatosRol() {
    this.usuario.role = "Rey"
    this._usuarioService.actualizarUsuarioRol(this.usuario._id, this.usuario).subscribe(
      (response: any) => {
        if (response.usuario) {
          this.actualizacionCorrecta = "Rol actualizado Correctamente";
          this.usuario = response.usuario;
          localStorage.setItem("sesion", JSON.stringify(this.usuario));
        } else {
          this.actualizacionCorrecta = "El Rol no se actualizaron por completo contacta al administrador de la aplicacion";
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }
}



