import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuarios';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-index',
  templateUrl: './content-index.component.html',
  styleUrls: ['./content-index.component.css'],
  providers: []
}) export class ContentIndexComponent implements OnInit {
  usuario: Usuario;
  pri_correo;
  sec_correo; registroCorrecto; constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    if (localStorage.getItem("sesion") != null) {
      this._router.navigate(['/catalogo']);
    }
    this.usuario = new Usuario('', '', null, '', '', '', '', '', '', '', '', '', '', null); //en el último no estoy segura de que sea así
  } ngOnInit() {
  } registrar() {
    this.usuario.correo = this.pri_correo + this.sec_correo;
    console.log(this.usuario)
    this._usuarioService.registrar(this.usuario).subscribe(
      (response: any) => {
        if (response.usuario) {
          this.registroCorrecto =
            "El registro es correcto te puedes loguear con el email " + this.usuario.correo;
          this.usuario = new Usuario('', '', null, '', '', '', '', '', '', '', '', '', '', null);;
          this.pri_correo = ""
        } else {
          this.registroCorrecto =
            "no se ha realizado el registro del usuario, consulte con soporte ";
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }
}



