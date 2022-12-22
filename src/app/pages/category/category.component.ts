import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Product} from "../../models/product.model";
import { GetProductsService } from "../../services/get-products.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  categoryId: string | null = null;
  offSetPagination=0;
  limit=10;
  products: Product[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private getProductsService: GetProductsService
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(switchMap(params => {
      this.categoryId = params.get('id')
      if(this.categoryId){
        return this.getProductsService.getByCategory(this.categoryId, this.limit, this.offSetPagination)
      }
      return []
    }))
      .subscribe(data=>{
      this.products=data
    })
  }

  loadMore(){

  }

}
