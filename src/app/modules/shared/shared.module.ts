import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTES LOCALES Y GLOBALES
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

//COMPONENTES DEL MATERIAL
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

//IMPORTAMOS PARA ACCEDER A TODAS LAS RUTAS
import { AppRoutingModule } from 'src/app/app-routing.module';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports:
    [
      NavbarComponent,
      FooterComponent,
      MatIconModule,
      MatButtonModule,
      MatToolbarModule,
      MatMenuModule
    ]
})
export class SharedModule { }
