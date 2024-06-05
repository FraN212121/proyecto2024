import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { RarezaComponent } from './pages/rareza/rareza.component';
import { TipoComponent } from './pages/tipo/tipo.component';
import { TiendaComponent } from './pages/tienda/tienda.component';

const routes: Routes = [
  {
    path:"productos",component:ProductosComponent
  },
  {
    path:"rareza",component:RarezaComponent
  },
  {
    path:"tipo",component:TipoComponent
  },
  {
    path:"tienda",component:TiendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
