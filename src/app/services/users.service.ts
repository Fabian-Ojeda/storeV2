import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, CreateUserDTO} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl='https://young-sands-07814.herokuapp.com/api/users'
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(){
    return this.httpClient.get<User[]>(this.apiUrl)
  }

  create(dto: CreateUserDTO){
    return this.httpClient.post(this.apiUrl,dto)
  }
}
