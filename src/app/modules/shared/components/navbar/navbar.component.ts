import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
logueado = true; // booleana para manejo de registro y el inicio de sesion
deslogueado = false; // booleana para manejon de cierre de sesion


constructor(
  public servicioAuth: AuthService,
  public servicioRutas: Router
){}

// funcion "iniciar" para invertir los valores
Iniciar(){
  this.logueado=false;
  this.deslogueado=true;
}

// funcion "cerrarsesion" devuelve a los valores originales
Cerrarsesion(){
  this.deslogueado=false;
  this.logueado=true;

  // llamamos al metodo "CerrarSesion" del auth.service para limpiar el token
  this.servicioAuth.CerrarSesion();
  this.servicioRutas.navigate(['/']);
}

// funcion cambiar fondo
cambiarFondo(){
  let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement
let label_toggle: HTMLElement | null = document.getElementById('label_toggle') as HTMLElement

if (toggle) {
  let checked: boolean = toggle.checked;
  document.body.classList.toggle('dark', checked)

  if (checked) {
    label_toggle!.innerHTML = '<i class="fa-regular fa-sun"></i>'
  }else{
    label_toggle!.innerHTML = '<i class="fa-regular fa-moon"></i>'
  }
}

}

}
