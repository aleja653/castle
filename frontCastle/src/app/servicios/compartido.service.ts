import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {  public video = new Subject<any>();
  public videoEmitida = this.video.asObservable();
  emitirVideo(url:any){
    this.video.next(url);
    }

  public logue = new Subject<any>();
  public logueEmitido = this.logue.asObservable();
  emitirLogueo(usuarioLogueado:any){
    this.logue.next(usuarioLogueado);
  }
}
