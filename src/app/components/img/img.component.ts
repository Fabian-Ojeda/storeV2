import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  img = "";
  @Input('img')
  set changeImg(newImage:string){
    this.img=newImage
    //alert("unicamente cambio la imagen")
  }
  @Input() alt = "";
  @Output() loaded = new EventEmitter<string>();
  messageError = "";
  counter =0;
  counterFn: number | undefined;

  imgError() {
    this.messageError = "Mande algo que sirva chino, porque manda direcciones que no son de imagenes, asi como? ¯\\_(o_O)_/¯"
  }

  meroSuccess() {
    this.messageError = "";
    //this.loaded.emit("Mejor dicho, una maravilla este platzi")
  }

  constructor() {
    //before render
    //console.log("se renderizo el ", 'constructor')
  }

  ngOnDestroy() {
    /*alert("on destroy")
    window.clearInterval(this.counterFn);*/
  }

  ngAfterViewInit() {
    // despues de que se renderiza
    //alert("after view init")
  }

  ngOnInit(){
    /*this.counterFn = window.setInterval(() => {
      this.counter++
    },1000)
    // Aqui se pueden correr cosas asincronas
        alert("arranco desde el init")*/
    }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes)
        //alert("algo cambio "+ this.img)
  }

  //------------------------------------------A continuación se encuantra la primera versión del diseño----------------------------------//
  /*
  * @Input() img: string = "";
  @Input() alt: string = "";
  @Output() loaded = new EventEmitter<string>();
  messageError: string = "";
  counter =0;
  counterFn: number | undefined;

  imgError() {
    this.messageError = "Mande algo que sirva chino, porque manda direcciones que no son de imagenes, asi como? ¯\\_(o_O)_/¯"
  }

  meroSuccess() {
    this.messageError = "";
    this.loaded.emit("Mejor dicho, una maravilla este platzi")
  }

  constructor() {
    //before render
    console.log("se renderizo el ", 'constructor')
  }

  ngOnDestroy() {
    alert("on destroy")
    window.clearInterval(this.counterFn);
  }

  ngAfterViewInit() {
    // despues de que se renderiza
    alert("after view init")
  }

  ngOnInit(){
    this.counterFn = window.setInterval(() => {
      this.counter++
    },1000)
    // Aqui se pueden correr cosas asincronas
        alert("arranco desde el init")
    }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes)
        //alert("algo cambio "+ this.img)
  }
  *
  * */
}
