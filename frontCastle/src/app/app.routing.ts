import {ModuleWithProviders} from '@angular/core'; 
//modulos y funcionalidades de router
import {Routes,RouterModule} from '@angular/router';

import {ContentIndexComponent} from 
'./componentes/content-index/content-index.component';
import {LoginComponent} from
 './componentes/login/login.component';
import {HeaderComponent} from 
'./componentes/header/header.component';
const appRoutes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: '', component:ContentIndexComponent},
     {path:'menu',component:HeaderComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders 
= RouterModule.forRoot(appRoutes); 