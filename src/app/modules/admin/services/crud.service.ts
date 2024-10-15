import { Injectable } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
// importaciones para manejo de archivo
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

/*
getDownloadURL: para obtener la URL de descarga de una imagen subida
getStorage: para obtener la instancia de almacenamiento
ref: para crear referencias a ubicaciones en el almacenamiento 
UploadResult: tipo que representa el resultado de una operacion subida
uploadString: para subir imagenes en formaton cadena 
deleteObject: para eliminar un espacio en el almacenamiento
*/ 


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // DEFINIMOS COLECCION PARA LOS PRODUCTOS DE LA WEB
  private productosCollection: AngularFirestoreCollection<Productos>

  // definir
  private respuesta!: UploadResult;

  // inicializar storage
  private storage = getStorage();

  // 

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('productos')
  }

  // CREAR productos
  crearProductos(productos: Productos, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // creamos numero identificativo para el prodcuto en la BD
        const idProducto = this.database.createId();

        // asignamos un ID creado al atributo idProducto de la interfaz Productos
        productos.idProducto = idProducto;

        // asignamos URL recibida del parametro al atributo "imagen" de interfaz Producto
        productos.imagen = url;

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
  modificarProducto(idProducto:string, nuevaData:Productos){
    /* accedemos a la oclecion productos de la base de datos,
      buscamos el id del productos seleccionado y lo actualizamos con el metodo update,
      enviando la nueva informacion 
    */
    return this.database.collection('productos').doc(idProducto).update(nuevaData);
  }


  //ELIMINAR productos
  eliminarProducto(idProducto:string, imagenUrl: string){
    return new Promise((resolve, reject)=>{
      try{
        const storage = getStorage();
        const referanciaImagen = ref(storage, imagenUrl);

        deleteObject(referanciaImagen)
        .then((res) => {
        const respuesta = this.productosCollection.doc(idProducto).delete();
        resolve (respuesta);
      })
      
      }
      catch(error){
        reject(error);
      }
    })
  }
  // obtener url de imagenes
  obtenerUrlImagen(respuesta: UploadResult){
    // retorna URL obtenida como referencia
    return getDownloadURL(respuesta.ref);
  }

  /**
   * PARAMETRO DEFINIDOS
   * @param {string} nombre <-- nombre de la imagen
   * @param {any} imagen <-- tipo de imagenes que se puedan subir
   * @param {string} ruta <-- ruta de almacenamiento de las imagenes
   * @returns <-- se retorna lo obtenido
   */

  // SUBIR imagen 
  async subirImagen(nombre:string, imagen:any, ruta:string){
    try {
      // crear una referencia de imagen
      // accede a Storage (almacenamiento), ruta (carpeta) / nombre (nombreImagen)
      let referanciaImagen = ref(this.storage, ruta + '/' + nombre);

      //asignarle a la respuesta la informacion de las imagenes subidas
      this.respuesta = await uploadString(referanciaImagen, imagen, 'data_url')

      .then(resp => {
        return resp;
      })

      return this.respuesta;
    }
    catch(error){
      console.log(error);
      return this.respuesta;
    }
  }
}
