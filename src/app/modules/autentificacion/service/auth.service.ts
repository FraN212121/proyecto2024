import { Injectable } from '@angular/core';
// servicio en la nube de autentificacion de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from '../../shared/service/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor
  (private auth: AngularFireAuth,
  private servicioFirestore: AngularFirestore) { }
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
  async obtenerUid(){
    // nos va a generar una promessa y las constante la va a capturar 
    const user = await this.auth.currentUser;
    /* si el usuario no respeta la estructura de la interfaz o
      si tuvo problemas para el registro -- ej: mal internet */
    if (user == null) {
      return null;
    } else{
      return user.uid;
    }
  }
  //Funcion para obtener el usuario
  obtenerUsuario(email:string){
    /* 
    retornamos del servicio firestore, la coleccion de 'usuarios', buscamos una referencia en los 
    email registrados y  los comparamos con los que ingrese el usuario al iniciar sesion, y lo obtiene
    con el .get(), lo vuelve una promesa => da un resultado RESUELTO o RECHAZADO
    */
    return this.servicioFirestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise()
  }
}
