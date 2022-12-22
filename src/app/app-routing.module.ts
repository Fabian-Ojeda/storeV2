import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

//Paginas------------------

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CustomPreloadService } from "./services/custom-preload.service";
import { QuicklinkStrategy } from "ngx-quicklink";

const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('./website/website.module').then(m=>m.WebsiteModule), data:{
      preload:true
    }
  },
  {
    path:'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path:'**',
    component:NotFoundComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy:CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
