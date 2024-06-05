import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  // imput de la contraseña para ver los caracteres
  hide = true;

  // importar la interfaz de usuario
  usuarios: Usuario = {
    uid: '', // inicializamos con comillas simples porque es STRING
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // creamos coleccion de usuario, tipo 'usuario' para arrays
  coleccionUsuarios: Usuario[] = [];

  // funcion para el registro de nuevos usuarios
  registrar() {
    // constante que resguarda la info que ingresa el usuario
    const credenciales = {
      uid: this.usuarios.uid, // definimos el atributo de la interaz con una variable local
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password
    }

    // enviamos la nueva informacion como un nuevo objeto a la coleccion de usuarios
    this.coleccionUsuarios.push(credenciales)
    this.limpiarInputs()

    // mostramos credenciales por consola
    console.log(credenciales);
    console.log(this.coleccionUsuarios)

    // funcion para vaciar inputs

  }
  limpiarInputs() {
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = '',
    }
    alert('te registraste correctamente')
  }
}
