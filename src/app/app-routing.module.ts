import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';


const routes: Routes = [
  //ruta por defecto en la inicializacion
  {
    path: "", component: InicioComponent
  },
  
  //carga perezosa
  //ruta que nos vincula el modulo inicio y su contenido
  //loadChildren: nos indica que habra una ruta hija
  //.then: funcion asincronica tipo PROMESA
  {
    path: "", loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: "", loadChildren: () => import('./modules/productos/productos.module').then(m => m.ProductosModule)
  },
  {
    path: "", loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m => m.AutentificacionModule
      
    )
  },
  {
    path:"",loadChildren:()=> import ('./modules/admin/admin.module').then(m => m.AdminModule)
  }
]   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
