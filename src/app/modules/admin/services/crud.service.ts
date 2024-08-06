import { Injectable } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';


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
  obtenerProducto() {
    
    /* 
     snapshotChanges => toma una captura del estado de los datos
     pipe => tuberias que retornan un nuevo arreglo 
     map => "mapea" o recorre esa nueva informacion
     a => resguarda la nueva informacion y la envia como un documento
     */
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }




 
  //EDITAR productos
  //ELIMINAR productos
}
