import { Injectable } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // DEFINIMOS COLECCION PARA LOS PRODUCTOS DE LA WEB
  private productosCollection: AngularFirestoreCollection<Productos>
  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('productos')
  }

  // CREAR productos
  crearProductos(productos: Productos) {
    return new Promise(async (resolve, reject) => {
      try {
        // creamos numero identificativo para el prodcuto en la BD
        const idProducto = this.database.createId();
        // asignamos un ID creado al atributo idProducto de la interfaz Productos
        productos.idProducto = idProducto;

        const resultado = await this.productosCollection.doc(idProducto).set(productos);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }





  //OBTENER productos
  //EDITAR productos
  //ELIMINAR productos
}
