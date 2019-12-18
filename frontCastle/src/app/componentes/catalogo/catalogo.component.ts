import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuarios';
import { CompartidoService } from
'../../servicios/compartido.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  usuario:Usuario;


  constructor(    
    private _servicioCompartido:CompartidoService){
      
    
      this.usuario = JSON.parse(localStorage.getItem("sesion"));
     }

  ngOnInit() {
    
  }

 

}
