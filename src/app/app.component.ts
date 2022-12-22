import { Component } from '@angular/core';
import { AuthService} from "./services/auth.service";
import {UsersService} from "./services/users.service";
import { CreateUserDTO } from "./models/user.model";
import {FilesService} from "./services/files.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'storeV2';
  img = ''
  showImg = true;
  token:string="";
  userLoaded:string=""
  imgRtaCreation = ""

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fileService:FilesService
  ) {
  }
  //product:Product={id:"1",name:"Cerveza y Licor", img:"https://www.fotosdememes.com/wp-content/uploads/2021/09/esta-vacio.jpg" ,price:4500 }

  todoFine(message:string){
    alert("chimba desde el padre\n"+message)
  }

  destroyImage() {
    this.showImg = !this.showImg
  }

  createUser(){
    const UserToCreate: CreateUserDTO = {name:"fabian",email:"fabian@email.com", password: "password"}
    this.userService.create(UserToCreate).subscribe(rta => {
      console.log(rta)
    })
  }

  login(){
    this.authService.login("fabian@email.com", "password")
      .subscribe(rta => {
        this.token = rta.access_token
        console.log(rta)
      })
  }

  getProfile(){
    this.authService.profile().subscribe(data => {
      this.userLoaded=data.name
      console.log(data)
    })
  }

  downloadPDF(){
    this.fileService.getFile("holi (°-°)/¯.pdf","../assets/files/pdf/dummy.pdf", "application/pdf")
      .subscribe()
  }
  onUpload(event:Event){
    const element = event.target as HTMLInputElement
    const file= element.files?.item(0)
    if(file){
      this.fileService.uploadFile(file).subscribe(rta => {
        this.imgRtaCreation=rta.location
      })

    }
  }
}
