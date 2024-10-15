import { Component } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // creamos collecion local de productos -> la definimos como array
  collectionProductos: Productos[] = [];


  productoSeleccionado!: Productos; // ! => toma valores vacios


  modalVisibleProducto: boolean = false;

  nombreImagen!: string // obtendra el nombre de la imagen

  imagen!: string// 


  // definimos formularios para los productos 
  /* 
  atributos alfanumericos (string) se inicializan con comillas simples
  atributos numericos (number) se inicializan ocn cero (0)
  */
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  })
  productoEdit: any;

 constructor(public servicioCrud: CrudService) { }
 
  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.collectionProductos = producto;

    })
    console.log(this.collectionProductos)
  }

 

  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Productos = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: '',
        alt: this.producto.value.alt!,
      }

      // Enviamos nombre y url de la imagen; definimos carpeta de imagenes como "productos"
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          // encapsula una respeusta 
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {

              this.servicioCrud.crearProductos(nuevoProducto, url)
                .then(producto => {
                  alert("Ha agregado un nuevo producto con exito");
                  // resetea el formulario y las casillas quedan vacias
                  this.producto.reset();
                })
                .catch(error => {
                  alert("Ha ocurrido un erro al cargar el producto")

                  this.producto.reset();
                })
            })

        })


    };
  }

  // CARGAR IMAGENES
  cargarImagen(event: any) {
    // variable para obtener el archivo subido desde le input del HTML
    let archivo = event.target.files[0];

    // variable para crear un nuevo objeto de tipo "archivo" o "file" y leerlo
    let reader = new FileReader();

    if (archivo != undefined) {
      // llamamos a metodo readAsDataURL para leer toda la informacion recibida
      // enviamos como parametro el "archivo" porque sera el encargador de tener
      // la info ingresada por el usuario

      reader.readAsDataURL(archivo);

      reader.onloadend = () => {

        let url = reader.result;

        if (url != null) {
          // definimos nombre de la imagen con atributo "name" del input
          this.nombreImagen = archivo.name;

          // definimos ruta de la imagen segun la url recibida 
          this.imagen = url.toString();
        }
      }
    }
  }


  // funcion vinculada al modal y boton de la tabla
  mostrarBorrar(productoSeleccionado: Productos) {
    this.modalVisibleProducto = true;

    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    /* ahora enviamos tanto la IP  del producto (para identificarlo en la firestore)
     y la url de la imagen (para eliminarlo del almacenamiento de storage)
     ID y URL: identificadores propios de cada archivo en la base de datos
     */
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        alert("se ha podido eliminar ocn exito");
      })
      .catch(error => {
        alert("Ha ocurrido un error al eliminar el producto> \n" + error);
      })
  }


   // EDITAR PRODUCTOS
  // Se envía y llama al momento que tocamos botón "Editar" de la tabla
  mostrarEditar(productoSeleccionado: Productos) {
    this.productoSeleccionado = productoSeleccionado;
    /*
      Toma los valores del producto seleccionado y los va a
      autocompletar en el formulario del modal (menos el ID)
      autocompletar en el formulario del modal
      (menos el ID y la URL de la imagen)
    */
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      // imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
  }

  // VINCULA A BOTÓN "editarProducto" del modal de "Editar"
  editarProducto() {
    let datos: Productos = {
      // Solo idProducto no se modifica por el usuario
      idProducto: this.productoSeleccionado.idProducto,
      /* Los demás atributos reciben nueva información/ 
      valor desde el formulario */
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!
    }

    // Verificamos si el usuario ingresa o no una nueva imagen
    if(this.imagen){
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
      .then(resp => {
        this.servicioCrud.obtenerUrlImagen(resp)
        .then(url =>{
          datos.imagen = url; // Actualizamos URL de la imagen en los datos del formulario
          this.actualizarProducto(datos); // Actualizamos los datos
          this.producto.reset(); // Vaciar las casillas del formulario
        })
        .catch(error => {
          alert("Hubo un problema al subir la imagen :( \n"+error);
          this.producto.reset();
        })
      })
    }else{
      /*
        Actualizamos formulario con los datos recibidos del usuario, pero sin 
        modificar la imagen ya existente en Firestore y en Storage
      */
      this.actualizarProducto(datos);
    }
  }
  // ACTUALIZAR la información ya existente de los productos
  actualizarProducto(datos: Productos){
    // Enviamos al método el id del producto seleccionado y los datos actualizados
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert("El producto se ha modificado con éxito.");
      })
      .catch(error => {
        alert("Hubo un problema al modificar el producto: \n" + error);
      })
  }
}


  

