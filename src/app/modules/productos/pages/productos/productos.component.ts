import { Component } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  // string que modificara el valor de @input en el componente hijo
  product: string = '';

  // coleccion de productos añadidos a la lista
  productosCarrusel: Productos[] = [];

  productoAnadido(producto: Productos) {
    // reemplazamos el valor del product
    this.product = `${producto.nombre}:$${producto.precio}`

    try { // agregamos la informacion recibida por el parametro de la funcion 
      // a la coleccion del carrusel
      this.productosCarrusel.push(producto);

      Swal.fire({
        title: 'dalee',
        text: 'Ha añadido el producto con exito!',
        icon: 'info'
      })
    }
    catch (error) {
      Swal.fire({
        title: 'dalee',
        text: 'Ha ocurrido un error con el producto!',
        icon: 'error'
      })
    }
  }
}
