import { Component } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-rareza',
  templateUrl: './card-rareza.component.html',
  styleUrls: ['./card-rareza.component.css']
})
export class CardRarezaComponent {
  // coleccion de todos los productos de forma local
  coleccionProductos: Productos[] = [];

  // coleccion de productos de una sola categoria
  coleccionRareza: Productos[] = [];

  // varibale para seleccionar productos especificos
  productoSeleccionado!: Productos;

  // variable para manejar el estado del modal
  modalVisible: boolean = false;

  // patentamos de forma local el servicio para acceder en el
  constructor(public servicioCrud: CrudService) { }

  // inicializa al momento que renderiza el componente
  ngOnInit(): void {
    // accedemos a metodo 'obtenerProducto' y nos subscribimos a los cambios
    // recibimos notifiacion ante modificaciones
    this.servicioCrud.obtenerProducto().subscribe(productos => {
      this.coleccionProductos = productos

      // mostrara la coleccion de esa categoria hasta el momento
      this.mostrarProductosRareza();
    })
  }

  // funcion para filtrar los productos de tipo 'rareza'
  mostrarProductosRareza() {
    this.coleccionProductos.forEach(productos => {

      if (productos.categoria === "rareza") {
        this.coleccionRareza.push(productos);
      }
    }
    )
  }
}
