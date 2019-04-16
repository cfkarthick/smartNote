import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScanNotePage } from './scan-note.page';
import {ScriptServiceService} from '../script-service.service'

const routes: Routes = [
  {
    path: '',
    component: ScanNotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanNotePage]
})
export class ScanNotePageModule {}
