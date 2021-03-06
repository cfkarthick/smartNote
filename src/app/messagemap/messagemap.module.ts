import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessagemapPage } from './messagemap.page';
//import { RegisterPage } from '../register/register.page';

const routes: Routes = [
  {
    path: '',
    component: MessagemapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessagemapPage]
})
export class MessagemapPageModule {}
