import { Component } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
// definimos coleccion de productos locales
coleccionProductos: Productos[] = [];

// variable local para seleccionar un producto en especifico 
productoSeleccionado!: Productos;


modalVisible: boolean = false;

constructor(public servicioCrud: CrudService){}

ngOnInit(): void{
  this.servicioCrud.obtenerProducto().subscribe(productos =>{
    this.coleccionProductos=productos;
  })
}

// funcion para mostrar mas informacion de los productos 
mostrarVer(info: Productos){
  // cambio estado del modal a true (ahora es visible)
  this.modalVisible=true;

  // guardo en variable seleccionado la informacion de producto elegido 
  this.productoSeleccionado=info;
}
}
