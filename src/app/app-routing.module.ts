import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'msgConfig', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'msgConfig', loadChildren: './messagemap/messagemap.module#MessagemapPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'modal-page', loadChildren: './modal-page/modal-page.module#ModalPagePageModule' },
  { path: 'create-message', loadChildren: './create-message/create-message.module#CreateMessagePageModule' },
  { path: 'marker/:ID', loadChildren: './create-marker/create-marker.module#CreateMarkerPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
