import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  car:Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([])

  myCart$ = this.myCart.asObservable()

  addToCar(product:Product){
    //alert("llegó al servicio")
    this.car.push(product)
    this.myCart.next(this.car)
  }

  getTotal(){
    return this.car.reduce((sum, item) => sum+item.price, 0)
  }

  //constructor() { }
}
