import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { RarezaComponent } from './pages/rareza/rareza.component';
import { TipoComponent } from './pages/tipo/tipo.component';
import { TiendaComponent } from './pages/tienda/tienda.component';


@NgModule({
  declarations: [
    ProductosComponent,
    RarezaComponent,
    TipoComponent,
    TiendaComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ],
  exports: [
    ProductosComponent,
    RarezaComponent,
    TipoComponent,
    TiendaComponent]
})
export class ProductosModule { }
