import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../models/auth.model";
import {User} from "../models/user.model";
import {BehaviorSubject, switchMap, tap} from "rxjs";
import {TokenService} from "./token.service";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='https://damp-spire-59848.herokuapp.com/api/auth'
  private user = new BehaviorSubject<User | null>(null)
  user$ = this.user.asObservable()

  constructor(
    private httpCLient:HttpClient,
    private tokenService:TokenService
  ) { }

  login(email:string, password:string){
    return this.httpCLient.post<Auth>(`${this.apiUrl}/login`,{email, password})
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.access_token)
        })
      )
  }

  profile (){
    return this.httpCLient.get<User>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.user.next(user))
    )
  }

  endSession(){
    this.tokenService.deleteToken()
  }

}
