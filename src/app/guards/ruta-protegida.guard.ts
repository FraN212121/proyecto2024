import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../modules/autentificacion/service/auth.service';
import { Router } from '@angular/router';
import {map, switchMap, of, from} from 'rxjs'

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {

  // inyectamos servicio de autentificacion en el guardian (forma local)
  const servicioAuth=inject(AuthService)

  // inyectamos servidio de rutas de forma local
  const serviciosRutas=inject(Router);  
  
  // especificamos cual es el rol que va a esperar el guardian para activarse|23xc0

  const rolEsperado = "admin";
  
  return from(servicioAuth.obtenerUid()).pipe(
    switchMap(uid =>{
      if (uid) {
        return servicioAuth.obtenerRol(uid).pipe(
          map (rol =>{
            if (rol === rolEsperado) {
              // si coincide el rol esperado, damos el acceso al usuario
              console.log("Usuario verificado como administrador.")
              return true;
            }else{
              // denegamos acceso al usuario
              return false
            }
          })    
        )
      }else{
        console.log("Usuario no validado");

        // redireccionamos acceso a inicio para usuarios no validados
        return of(serviciosRutas.createUrlTree(['/inicio']))
      }
    })
  );
};
