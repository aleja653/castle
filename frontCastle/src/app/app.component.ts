import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CompartidoService } from './servicios/compartido.service';
>>>>>>> 7470c3c6466428b1b2e6a8a4e08120139b4b3a39
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  title = 'frontCastle';
  constructor (
    private _router: Router
  ){
    
  }
=======
  title = 'FrontCastle';

  usuarioLogueado = false;

  constructor (
    private _compartidoService:CompartidoService,
    private _router: Router
  ){
  if(localStorage.getItem("sesion") != null){
    this.usuarioLogueado = true;
  }
  this._compartidoService.logueEmitido.subscribe (
      usuarioLogueado =>{
      this.usuarioLogueado = usuarioLogueado;
    }
  )
}
cerrarSesion(){
  this.usuarioLogueado = false;
  localStorage.removeItem("sesion");
  localStorage.removeItem("playlist");
  this._router.navigate(['/'])
}
>>>>>>> 7470c3c6466428b1b2e6a8a4e08120139b4b3a39
}
