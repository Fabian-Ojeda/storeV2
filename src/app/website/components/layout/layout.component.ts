import { Component } from '@angular/core';
import {CreateUserDTO} from "../../../models/user.model";
import { AuthService} from "../../../services/auth.service";
import {UsersService} from "../../../services/users.service";
import {FilesService} from "../../../services/files.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
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

  createUser(){
    const UserToCreate: CreateUserDTO = {name:"fabian",email:"fabian@email.com", password: "password"}
    this.userService.create(UserToCreate).subscribe(rta => {
      console.log(rta)
    })
  }

  todoFine(message:string){
    alert("chimba desde el padre\n"+message)
  }

  destroyImage() {
    this.showImg = !this.showImg
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
