import { Injectable } from '@angular/core';
// Cloud firestore - accedemos a las colecciones
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // definimos de forma privada la coleccion de usuario, para que no sea accesible en toda la aplicacion
  // lo definimos como una coleccion de firestore que respete la esctructura  de nuestra interfaz 'Usuario'
private usuariosCollection: AngularFirestoreCollection <Usuario>
  constructor(private database: AngularFirestore) { 
    // usuariosCollection va a ingresar a la nueva coleccion 'usuarios' que esta en nuestra base de datos
    this.usuariosCollection = this.database.collection<Usuario>('usuarios')
   }
}
