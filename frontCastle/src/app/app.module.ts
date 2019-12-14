import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentIndexComponent } from './componentes/content-index/content-index.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { PlanesHomeComponent } from './componentes/planes-home/planes-home.component';
import { LoginComponent } from './componentes/login/login.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { UserProfileComponent } from './componentes/user-profile/user-profile.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HeaderComponent } from './componentes/header/header.component';
import { VideosComponent } from './componentes/videos/videos.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentIndexComponent,
    QuienesSomosComponent,
    PlanesHomeComponent,
    LoginComponent,
    CatalogoComponent,
    UserProfileComponent,
    EventosComponent,
    PagosComponent,
    RegistroComponent,
    HeaderComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
