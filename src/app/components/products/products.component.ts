import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UpdateProductDTO, CreateProductDTO, Product} from "../../models/product.model";
import {StoreService} from "../../services/store.service";
import {GetProductsService} from "../../services/get-products.service";
import Swal from 'sweetalert2'
import {switchMap} from "rxjs/operators";
import {SwiperOptions} from "swiper";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y , EffectCube } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCube]);
@Component({
  selector: 'list-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(
    private storeService: StoreService,
    private getProductsService: GetProductsService
  ) {
    this.totalCar = this.storeService.getTotal();
    this.totalProducts = this.storeService.car.length
  }

  ngOnInit(): void {
    if(this.productDefault){
      this.onShowDetail(this.productDefault)
    }
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    effect:"cube",
    loop:true
  };

  @Output() requestMore = new EventEmitter<string>()
  @Input() products:Product[] = []
  @Input() productDefault:string|null = null
  totalCar = 0
  totalProducts = 0
  todayDate = new Date()
  myBirthday = new Date(1997,5,1)
  showProductDetail=false;
  statusDetail:'loading'| 'sucess' | 'error' | 'init' = 'init';
  productChoosed:Product = {
    id: '',
    price: 0,
    images:[],
    title:'',
    category:{
      id:0,
      name:'',
      typeImg:''
    },
    description:''
  };

  getProductsByPage(){
    this.requestMore.emit()
  }

  productToCar(product: Product) {
    this.storeService.addToCar(product)
    this.totalCar = this.storeService.getTotal();
    this.totalProducts = this.storeService.car.length
  }

  toogleProductDetail(){
    this.showProductDetail=!this.showProductDetail
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading'
    this.getProductsService.getProductById(id).subscribe(data => {
      this.productChoosed=data
      this.showProductDetail=true
      this.statusDetail='sucess'
    }, response => {
      Swal.fire({
        title:'pailas',
        text:response,
        icon: 'error',
        confirmButtonText: 'jerrar bentana puej',
        confirmButtonColor: 'blue'
      })
      this.statusDetail='error'
      console.log(response)
    })

  }

  createNewProduct(){
    const product:CreateProductDTO = {
      categoryId: 2, description: "no hay", images: [""], price: 1400, title: "producto nuevo"
    }
    //Se envia la info al servicio para que cree el producto y se toma la respuesta
    this.getProductsService.createProduct(product).subscribe( data => {
      //Lo que retorne se agrega a la lista de productos
      this.products.unshift(data)
    })

  }

  updateProduct(){
    const changes:UpdateProductDTO={
      title:'newTitle',
      description:'and new description',
      images:['https://carroya-commons.avaldigitallabs.com/2053949/2053949_1_l.jpg', 'https://cdn.topgear.es/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/11/mclaren-mp4-12c-2152029.jpg?itok=wPIJorFA']
    }
    this.getProductsService.update(this.productChoosed.id, changes).subscribe(data => {
      this.productChoosed=data
      //En la siguiente linea, primero buscamos el indice del producto seleccionado en la lista de productos, eso va en los corchetes cuadrados
      // de this.products, porque es un indice, y luego eso lo igulamos al produccto seleccionado, porque lo estamos actualizando
      this.products[this.products.findIndex(item => item.id ===this.productChoosed.id)] = data
    })
  }

  deleteProduct(){
    this.getProductsService.delete(this.productChoosed.id).subscribe(data =>{
      console.log(data)
      if (data){
        this.products.splice(this.products.findIndex(item => item.id ===this.productChoosed.id), 1)
        this.toogleProductDetail()
      }
      }
    )
  }

  readAndUpdate(id:string){
    this.getProductsService.getProductById(id)
      .pipe(
        switchMap((product)=>{
          return this.getProductsService.update(id, {title:'Beautiful new title'})
        }),
        switchMap((product)=>{
          return this.getProductsService.update(id, {title:'Beautiful new title'})
        })
      )
      .subscribe(data => {
        console.log(data)
      })
  }

}
