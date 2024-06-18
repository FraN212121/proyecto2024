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

  private usuariosCollection: AngularFirestoreCollection<Usuario>
  constructor(private database: AngularFirestore) {

    // usuariosCollection va a ingresar a la nueva coleccion 'usuarios' que esta en nuestra base de datos
    this.usuariosCollection = this.database.collection<Usuario>('usuarios')
  }

  agregarUsuario(usuario: Usuario, id: string) {
    // generamos una nueva promesa y utiliza los metodos:
    // RESOLVE: promesa resulta -- funciona correctamente
    // REJECT: promesa rechaza -- ocurrio una falla 

    return new Promise(async (resolve, reject) => {
      try {
        // bloque try que encapsula la logica RECHAZADA 
        usuario.uid = id;
        // const resultado = coleccion de ususarios, envia como numero de documento el uid
        // y setea la informacion que ingresamos en el formulario de registro 

        const resultado = await this.usuariosCollection.doc(id).set(usuario);
        resolve(resultado);
        // bloque CATCH encapsula una falla y la vuelve un error
      } catch (error) {
        // captura si falla
        reject(error);
      }
    })
  }
}
