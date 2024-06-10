import { Injectable } from '@angular/core';
// servicio en la nube de autentificacion de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }
  // Funcion para registro
  registrar(email:string, password:string){
    // retorna el valor que es creado con el metodo "CreateEmail"
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  // Funcion para incio de sesion
  IniciarSesion(email:string, password:string){
    // valida la informacion del usuario - saber si existe en la coleccion 
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  // Funcion para cerrar sesion 
  CerrarSesion(){
    // devuelve una promesa vacia - quita token
    return this.auth.signOut();
  }
  // Funcion para tomar el uid

}
