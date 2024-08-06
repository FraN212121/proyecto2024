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
  collecionProductos: Productos[] = [];

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

  constructor(public servicioCrud: CrudService) { }
  ngOnInit(): void { 
    this.servicioCrud.obtenerProducto().subscribe(producto=>{
      this.collecionProductos=producto;
    })

  }
  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Productos = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!,
      }

      await this.servicioCrud.crearProductos(nuevoProducto)
        .then(producto => {
          alert("Ha agregado un nuevo producto con exito");
        })
        .catch(error => {
          alert("Ha ocurrido un erro al cargar el producto")
        })
    };
  }
  
}
