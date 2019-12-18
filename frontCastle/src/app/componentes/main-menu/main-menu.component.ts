import { Component, OnInit } from '@angular/core';
import { Usuario } from  '../../modelos/usuarios';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
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
