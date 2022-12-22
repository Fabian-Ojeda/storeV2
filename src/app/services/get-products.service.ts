import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {CreateProductDTO, Product, UpdateProductDTO} from "../models/product.model";
import {catchError, retry, map} from "rxjs/operators";
import { throwError } from "rxjs"
import {checkTime, TimeInterceptor} from "../interceptors/time.interceptor";

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  private apiUrl='https://young-sands-07814.herokuapp.com/'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProducts(){
    return this.httpClient.get<Product[]>(`${this.apiUrl}api/products`,{ context:checkTime()})
      .pipe(
        retry(3),
        map(products => products.map(item => {
          //Aqui, a cada elemento que llega en la data, es decir products, le vamos a agregar el valor taxes
          return{
            ...item, taxes: .19 * item.price
          }
        })))
  }

  getProductById(id:string){
    return this.httpClient.get<Product>(`${this.apiUrl}api/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse)=>{
          if (error.status===HttpStatusCode.NotFound){
            return throwError('Eso no se encontro')
          }
          return throwError('Eso esta mal')
        })
      )
  }

  getProductsByPage(limit:number,offset:number){
    return this.httpClient.get<Product[]>(`${this.apiUrl}api/products`, {params: {limit,offset}})
  }

  createProduct(data: CreateProductDTO){
    return this.httpClient.post<Product>(`${this.apiUrl}api/products`,data)
  }

  update(id:string, data: UpdateProductDTO){
    return this.httpClient.put<Product>(`${this.apiUrl}api/products/${id}`,data)
  }

  delete(id:string){
    return this.httpClient.delete<boolean>(`${this.apiUrl}api/products/${id}`)
  }

  getByCategory(categoryId:string, limit:number,offset:number){
    return this.httpClient.get<Product[]>(`${this.apiUrl}api/categories/${categoryId}/products`,{params: {limit,offset}})
  }

}
