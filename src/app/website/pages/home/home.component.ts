import {Component, OnInit} from '@angular/core';
import {GetProductsService} from "../../../services/get-products.service";
import {Product} from "../../../models/product.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  offSetPagination=0;
  limit=10;
  products: Product[] = []
  productId:string|null=null
  constructor(
    private getProductsService: GetProductsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(){
    this.getProductsService.getProductsByPage(this.limit,this.offSetPagination).subscribe(data => {
      this.products=data
      this.offSetPagination+=this.limit;
    })
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.productId=params.get('product')
    })
  }

  loadMore(){
    this.getProductsService.getProductsByPage(this.limit,this.offSetPagination).subscribe(data => {
      this.products=data
      this.offSetPagination+=this.limit;
    })
  }
}
