import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../service/auth.service';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true;
  constructor(
    public servicioAuth: AuthService,
    public servicioFireStore: FirestoreService,
    public servicioRutas: Router
  ) { }

  sesiones: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // funcion para iniciar sesion
  async Comparador() {
    const credenciales = {
      email: this.sesiones.email,
      password: this.sesiones.password
    }
    try{
      // obtenemos usuario de la BD
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email)
      // condicional verificada que ese usuario de la BD existiera o que sea igual al de nuestra coleccion
      if(!usuarioBD || usuarioBD.empty){
        alert("correo electronico no registrado");
        this.LimpiarInputs();
        return;
      }
      // vinculaba el primer documento de la ocleccion "usuario" que se obtenia de la BD
      const usuarioDoc = usuarioBD.docs[0];
      // Extrae los datos del documenta en forma de "objeto" y se especifica que va a ser del 
      // tipo "Usuario" (se refiere a la interfaz Usuario de nuestros modelos)
      const usuarioData = usuarioDoc.data() as Usuario;
      //  Encripta la contraseña que el usuariok envia mediante "Iniciar sesion"
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      // condicional que compara la contraseña que acabamos de encriptar y que le usuario envio con la 
      // que recibimos del "UsuarioData.."
      if(hashedPassword !== usuarioData.password){
        alert ("contraseña incorrecta");
        this.sesiones.password = '';
        return;
      }

      const res = await this.servicioAuth.IniciarSesion(credenciales.email, credenciales.password)
      .then(res => {
        Swal.fire({
          title: "Buen trabajo!",
          text: "Se pudo registrar con exito :)",
          icon: "success"
        });
        this.servicioRutas.navigate(['/Inicio'])
      })
      .catch(err => {
        Swal.fire({
          title: "Ocurrio un error!",
          text: "No se pudo registrar con exito :)",
          icon: "error"
        });
        this.LimpiarInputs();
      })
    }catch(error){
      this.LimpiarInputs();
    }
  }
  LimpiarInputs() {
    const inputs = {
      email: this.sesiones.email = '',
      password: this.sesiones.password = ''
    }
  }
  
}



  /*
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
 */



