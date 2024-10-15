  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  //RUTA PADRE -- MODULO RAIZ
  import { AppRoutingModule } from './app-routing.module';

  //ARCHIVO COMPONENT GENERAL
  import { AppComponent } from './app.component';

  //SOLO IMPORTAMOS COMPONENTES GLOBALES
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { SharedModule } from './modules/shared/shared.module';

  //FIREBASE - importamos HERRAMIENTAS a la base de datos
  import { environment } from 'src/environments/environment'; // vincula a la BD con la App
  import { AngularFireModule } from '@angular/fire/compat'; // trabaja con las colecciones de informacion
  import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // trabaja con la autentificacion
  import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // trabaja con imagenes y archivos 

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      // COMPONENTES GLOBALES
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      SharedModule,
      // VINCULACION CON FIREBASE
      AngularFireModule.initializeApp(environment.firebaseConfig), // inicializar firebase dentro del proyecto
      AngularFireAuthModule,
      AngularFireStorageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
