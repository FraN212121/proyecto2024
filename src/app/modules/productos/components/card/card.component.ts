import { Component, Input, Output, EventEmitter} from '@angular/core';
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

// variable local para manejar el estado del modal
modalVisible: boolean = false;

// booleano  para manejar la visibilidad de "ultima compra"
compraVisible: boolean=false;

// directivas para comunicarse con el componente padre
@Input()productoReciente:string='';
@Output()productoAgregado= new EventEmitter<Productos>();


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

agregarProducto(info:Productos){
  this.productoAgregado.emit(info);

  this.compraVisible=true;
}
}
