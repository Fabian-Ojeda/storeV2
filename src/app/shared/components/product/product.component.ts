import { Component , Input, Output, EventEmitter} from '@angular/core';
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() img = ""
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() productDetail = new EventEmitter<string>();

  todoFine(message:string){
    alert("chimba desde el padre\n"+message)
  }

  addProduct(){
    this.addedProduct.emit(this.product)
  }

  viewDetail(){
    this.productDetail.emit(this.product.id)
  }

}
