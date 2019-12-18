import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuarios';
import { UsuarioService } from '../../servicios/usuario.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuario: Usuario;
  filesToUpload: File;
  actualizacionCorrecta:string='';
  url = "http://localhost:3977/api/";

  constructor(
    private _usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("sesion"))
  }
  
  actualizarDatos() {
    this._usuarioService.actualizarUsuario(this.usuario._id, this.usuario).subscribe(
      (response: any) => {
        if (response.usuario) {
          if (this.filesToUpload != undefined) { 
            this._usuarioService.cargarImagenUsuario(this.filesToUpload, this.usuario._id).subscribe(
              (response: any) => {
                if (response.usuario) {
                  this.actualizacionCorrecta = "DATOS ACTUALIZADOS CORRECTAMENTE";
                  // Swal.fire({
                  //   position: 'center',
                  //   icon: 'success',
                  //   html:'<div class= swal>'+this.actualizacionCorrecta+'</div>',
                  //   showConfirmButton: false,
                  //   width: 400,
                  //   background: 'rgba(0, 0, 0, 0.911)',
                  //   timer: 4500 
                  // })
                  this.usuario = response.usuario;
                  localStorage.setItem("sesion", JSON.stringify(this.usuario));
                } else {
                  this.actualizacionCorrecta = "Los datos no se actualizaron por completo contacta al administrador de la aplicacion";
                }
              }, error => {
                if (error != null) {
                  console.log(error)
                }
              }
            )
          };
          this.actualizacionCorrecta = "Datos actualizados Correctamente";
          localStorage.setItem("sesion", JSON.stringify(this.usuario));
        } else {
          this.actualizacionCorrecta = "No se han podido actualizar sus datos, comuníquese con el administrador de la aplicación";
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0]; //recoger archivos seleccionados en el input
  }

}
