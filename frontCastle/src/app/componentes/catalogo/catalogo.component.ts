import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  @Input() generoVideo: string;

  constructor() { }

  ngOnInit() {
  }

}
