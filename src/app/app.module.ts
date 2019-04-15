import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AngularFirestore,AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule, } from '@angular/fire';
import {AngularFireStorageModule } from '@angular/fire/storage'
import {AngularFireAuthModule } from '@angular/fire/auth'

import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalPagePage} from './modal-page/modal-page.page'
import { CreateMessagePage} from './create-message/create-message.page'
import { FormsModule, ReactiveFormsModule,AbstractControl } from '@angular/forms';
import { environment } from '../environments/environment';
import { Device } from '@ionic-native/device/ngx';
import { CookieService } from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import { IonicNativePlugin } from '@ionic-native/core';

import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
//import { File } from '@ionic-native/File/ngx';
//import { WebView } from '@ionic-native/ionic-webview/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx'; 
import { IonicStorageModule } from '@ionic/storage'; 
//import { FilePath } from '@ionic-native/file-path/ngx';



@NgModule({
  declarations: [AppComponent,CreateMessagePage,ModalPagePage],
  entryComponents: [CreateMessagePage,ModalPagePage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    Device,
    CookieService,
    Storage,
    IonicNativePlugin,
    //File,
    //WebView,
    Storage,
    //FilePath,
    FileTransfer,FileTransferObject,
   
   
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
