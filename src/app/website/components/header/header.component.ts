import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StoreService} from "../../../services/store.service";
import {Category, Product} from "../../../models/product.model";
import {CategoriesServiceService} from "../../../services/categories-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() closeSession = new EventEmitter();
  @Input() userLoaded = ''
  activeMenu = false
  productsAdded: Product[] = []
  counter = 0
  categories: Category[] = []

  toogleMenu(){
    this.activeMenu = !this.activeMenu
  }

  ngOnInit(): void{
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
    this.categoriesService.getAll().subscribe(data => {
      this.categories=data
    })
  }

  constructor(private storeService:StoreService, private categoriesService:CategoriesServiceService) {
    this.productsAdded = storeService.car
  }

  endSession() {
    this.closeSession.emit()
    this.userLoaded=''
  }
}
