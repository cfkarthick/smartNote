import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';

import { Device } from '@ionic-native/device/ngx';
import { CookieService } from 'ngx-cookie-service';
import { NavController} from '@ionic/angular';
import {ScriptServiceService} from '../../src/app/script-service.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  menuContent :any;
  userData: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,fs :AngularFirestore, 
    device:Device,cs: CookieService,navCtrl:NavController,
    public ScriptService:ScriptServiceService
  ) {


    this.initializeApp();
    this.ScriptService.loadScript('threex');
    this.ScriptService.loadScript('stats');
    this.ScriptService.loadScript('ar');
    console.log('appComponent')
    this.menuContent = {'Login':'/Login','Register':'/Register'}

    fs.collection("/Users",ref=>ref.where("IMEI","==",'132sfsa3d2f13')).snapshotChanges()
    .subscribe((data)=>{
      console.log(data)
      if(data.length > 0){
        
        data.map(e => {
          this.userData = e.payload.doc.data();
          console.log(this.userData)    
        })
        cs.set('EmailID',this.userData.EmailID);
        cs.set('FirstName',this.userData.FirstName);
        cs.set('IMEI',this.userData.IMEI);
        cs.set('LastName',this.userData.LastName);
        cs.set('RoleId',this.userData.RoleId);

       
        navCtrl.navigateRoot('/menu/msgConfig');
      }
    })
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
