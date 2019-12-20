import { ModuleWithProviders } from '@angular/core';
//modulos y funcionalidades de router
import { Routes, RouterModule } from '@angular/router';

import { ContentIndexComponent } from
    './componentes/content-index/content-index.component';
import { LoginComponent } from
    './componentes/login/login.component';
import {VideosComponent} from 
'./componentes/videos/videos.component';
import {CatalogoComponent} from 
'./componentes/catalogo/catalogo.component';
import { MainMenuComponent } from
    './componentes/main-menu/main-menu.component';
import {PlanesHomeComponent} from
 './componentes/planes-home/planes-home.component';
import {QuienesSomosComponent} from
 './componentes/quienes-somos/quienes-somos.component';
 import {EventosComponent} from
 './componentes/eventos/eventos.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: ContentIndexComponent },
    { path:'menu',component:MainMenuComponent },
    { path:'video/:id',component:VideosComponent },
    { path:'catalogo',component:CatalogoComponent },
    { path:'planes',component:PlanesHomeComponent },
    { path:'quienes',component:QuienesSomosComponent },
    { path:'eventos',component:EventosComponent }
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders
    = RouterModule.forRoot(appRoutes); 

