import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../models/auth.model";
import {User} from "../models/user.model";
import {tap} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='https://young-sands-07814.herokuapp.com/api/auth'

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
    return this.httpCLient.get<User>(`${this.apiUrl}/profile`)
  }

}
