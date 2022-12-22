import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService : TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // En esta función se intercepta la petición
    //Tomamos la peticion (request entrante y la pasamos por la modificación, es decir el metodo addToken
    request = this.addToken(request)
    //Luego de que el request hay apasado por el metodo addToken, se devuelve, es decir continua con la ejecución
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>){
    //primero pedimos el token
    const token = this.tokenService.getToken()
    // Luego verificamos si el token existe
    if (token){
      //Si el token existe se clona la petición, es decir se va a hacer una igual pero cambiandole algo,
      //en este caso los headers para agregarle el token
      const authRequest = request.clone({
        //Asi se agrega el token
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      //Se retorna la peticion ya modificada
      return authRequest
    }
    //Si no hay token, la petición se va normal
    return request;
  }
}
