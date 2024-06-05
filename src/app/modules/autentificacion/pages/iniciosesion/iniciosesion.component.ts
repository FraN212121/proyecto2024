import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true;

  public data: Usuario[];

  constructor() {
    this.data = [
      {
        uid: "",
        nombre: "Santiago",
        apellido: "Lopez",
        email: "lopeznunez@gmail.com",
        rol: "visit",
        password: "123456789"
      }
    ]
  }

  // interfaz Usuario
  sesiones: Usuario={
    uid:'', // inicializamos con comillas simples porque es STRING
    nombre:'', 
    apellido: '',
    email: '',
    rol: '',
    password: '' 
  }

   // creamos coleccion de usuario, tipo 'sesiones' para arreglos
  coleccionSesiones: Usuario[] = [];

  Comparador() {
    // constante que resguarda la info que ingresa el usuario
    const credenciales = {
      uid: this.sesiones.uid, // definimos el atributo de la interaz con una variable local
      nombre: this.sesiones.nombre,
      apellido: this.sesiones.apellido,
      email: this.sesiones.email,
      rol: this.sesiones.rol,
      password: this.sesiones.password
    }

    // iniciamos un bucle en el for
    for (let  i = 0;  i < this.data.length; i++) {
     // asignamos al arreglo this.data.lenght y le asignamos a la constante numeracion
      const numeracion = this.data[i];
      // comparamos mediante el if cada uno de los datos entre la constante numeracion y credenciales
      if (numeracion.uid === credenciales.uid && numeracion.nombre === credenciales.nombre && numeracion.apellido === credenciales.apellido && numeracion.email === credenciales.email && numeracion.rol === credenciales.rol && numeracion.password === credenciales.password ) {
        // alert que indicia si se inicio sesion con exito junto a un break para que no se siga mostrando el alert
        alert('Inicio sesion')
        break
      }else{
        alert('error en el inicio de sesion')
        break
      }
    }

 
  }
}
