import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children:[
     
          
      { path: 'msgConfig', loadChildren: '../messagemap/messagemap.module#MessagemapPageModule' },
      { path: 'scanNote', loadChildren: '../scan-note/scan-note.module#ScanNotePageModule' },
      { path: 'login', loadChildren: '../login/login.module#LoginPageModule' },
      { path: 'register', loadChildren: '../register/register.module#RegisterPageModule' },
      { path: 'modal-page', loadChildren: '../modal-page/modal-page.module#ModalPagePageModule' },
      { path: 'marker/:ID', loadChildren: '../create-marker/create-marker.module#CreateMarkerPageModule' }
    ]
  },
  //{ path:'', redirectTo:'/menu/register' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {


}
