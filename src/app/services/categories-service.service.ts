import { Injectable } from '@angular/core';
import {secondEnvironment} from "../../environments/secondEnvironment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  private apiUrl = `${secondEnvironment.API_URL}`

  constructor(
    private httpClient:HttpClient
  ) { }

  getAll(){
      return this.httpClient.get<Category[]>(`${this.apiUrl}api/categories`)
  }
}
