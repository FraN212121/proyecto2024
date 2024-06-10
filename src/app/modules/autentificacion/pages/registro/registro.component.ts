import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
// importamos servicio de autentificacion
import { AuthService } from '../../service/auth.service';
// importamos componente de rutas de angular
import { Router } from '@angular/router';


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
  // fin de importaciones
  constructor(public servicioAuth: AuthService,
    public serviciosRutas: Router
  ){}

  // funcion para el registro de nuevos usuarios
  async registrar() {
    // constante que resguarda la info que ingresa el usuario
    /* REGISTRO LOCAL
    const credenciales = {
      uid: this.usuarios.uid, // definimos el atributo de la interaz con una variable local
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password
    }*/

    // REGISTRO CON SERVICIO 
    const credenciales={
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    const res = await this.servicioAuth.registrar(credenciales.email,credenciales.password)
    // el metodo THEN es una promesa que devuelve el mismo valor si todo sale bien
    .then(res => {
      alert("se pudo registrar con exito")
      // el metodo NAVIGATE nos redirecciona a otra vista 
      this.serviciosRutas.navigate(['/inicio'])
    })
    // el metodo CATCH captura una falla y la vuelve un error cuando la prmomesa salga mal
    .catch(error =>{
      alert("Hubo un error al registrar un nuevo usuario \n"+error)
    })

    // enviamos la nueva informacion como un nuevo objeto a la coleccion de usuarios
    // this.coleccionUsuarios.push(credenciales)

    // notificamos al usuario que se registro bien
    alert("Te registraste con exito!");

    //
    this.limpiarInputs()

    // mostramos credenciales por consola
    // console.log(credenciales);
    // console.log(this.coleccionUsuarios)

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
