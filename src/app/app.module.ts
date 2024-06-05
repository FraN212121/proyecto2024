import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//RUTA PADRE -- MODULO RAIZ
import { AppRoutingModule } from './app-routing.module';

//ARCHIVO COMPONENT GENERAL
import { AppComponent } from './app.component';

//SOLO IMPORTAMOS COMPONENTES GLOBALES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
