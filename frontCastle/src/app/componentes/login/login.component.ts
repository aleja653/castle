import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuarios';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router'
import { CompartidoService } from 'src/app/servicios/compartido.service';@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  loginCorrecto: string='';
    constructor(
      private _usuarioService:UsuarioService,
      private _router: Router,
      private _compartidoService:CompartidoService
    ) {
      if(localStorage.getItem("sesion") != null) {
        this._router.navigate(['/catalogo'])
      }
      this.usuario = new Usuario('', '', null, '', '', '', '', '', '', '', '', '','', null); //en el último no estoy segura de que sea así
    }
    ngOnInit() {
      document.getElementById('footer').classList.add("fixed-bottom");
    }
  login() {
    this._usuarioService.login(this.usuario).subscribe(
      (response: any) => {
        if (response.usuario) {
          let usuarioLogueado = new Usuario(
            response.usuario._id,
            response.usuario.nombre,
            response.usuario.edad,
            response.usuario.correo,
            response.usuario.password,
            response.usuario.imagen,
            response.usuario.role,
            response.usuario.genero,
            response.usuario.plan,
            response.usuario.metodoPago,
            response.usuario.numtarjeta,
            response.usuario.codigoVerificación,
            response.usuario.fechaVenciTarjeta,
            response.usuario.videoFavoritos
          )    
            localStorage.setItem
            ("sesion",JSON.stringify(usuarioLogueado));
            this._compartidoService.emitirLogueo(true);
            this._router.navigate(['/catalogo'])
            
        } else {
          this.loginCorrecto =  "LOS DATOS INGRESADOS SON INCORRECTOS";     
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }
  }