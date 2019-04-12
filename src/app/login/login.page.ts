import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';


import { AngularFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  public EmailID: any;
  public Password: any;
  public Users: any;
  public userData: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public af: AngularFirestore,
    public cs:CookieService 
    
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });

    this.af.collection('/Users')


  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  login(){
    this.af.collection('/Users',ref=>ref.where('EmailID','==',this.EmailID).where('Password','==',this.Password)).snapshotChanges()
    .subscribe(data => {

      if(data.length > 0){
        
        data.map(e => {
          this.userData = e.payload.doc.data();

        })
        this.cs.set('EmailID',this.userData.EmailID);
        this.cs.set('FirstName',this.userData.FirstName);
        this.cs.set('IMEI',this.userData.IMEI);
        this.cs.set('LastName',this.userData.LastName);
        this.cs.set('RoleId',this.userData.RoleId);
        this.navCtrl.navigateRoot('/msgConfig')
      }
      
    })
    
  }

 

}
