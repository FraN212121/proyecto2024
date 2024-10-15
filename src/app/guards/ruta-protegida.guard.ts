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
  
  // especificamos cual es el rol que va a esperar el guardian para activarse
  const rolEsperado = "admin";
  
  return true;
};
