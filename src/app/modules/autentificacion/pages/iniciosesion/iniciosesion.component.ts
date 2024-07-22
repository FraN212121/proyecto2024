import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../service/auth.service';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true;
  usuarios: any;
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

      if(!usuarioBD || usuarioBD.empty){
        alert("correo electronico no registrado");
        this.LimpiarInputs();
        return;
      }
      const usuarioDoc = usuarioBD.docs[0];
      
      const usuarioData = usuarioDoc.data() as Usuario;

      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      if(hashedPassword !== usuarioData.password){
        alert ("contraseña incorrecta");
        this.usuarios.password = '';
        return;
      }

      const res = await this.servicioAuth.IniciarSesion(credenciales.email, credenciales.password)
      .then(res => {
        alert('se pudo iniciar sesion')
        this.servicioRutas.navigate(['/Inicio'])
      })
      .catch(err => {
        alert('no se pudo iniciar sesion' + err)
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



