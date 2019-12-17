import { Component, OnInit } from '@angular/core';
import {Usuario} from  '../../modelos/usuarios';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  cambiar = '2';  
  constructor() {
    this.usuario = JSON.parse(localStorage.getItem('sesion'));
   }
    
    modificar(numero){
      this.cambiar= numero;
    }

    ngOnInit() {
      document.getElementById('footer').classList.add("fixed-bottom");
    }

}
