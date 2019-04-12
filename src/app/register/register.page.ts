import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { Device } from '@ionic-native/device/ngx';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  roles: any;
  rolesCollection:any[]=[];
  register:any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public fs: AngularFirestore,
    
    
    private device: Device
  ) { 
    this.roles = fs.collection("Role").snapshotChanges();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    console.log(Validators);

    this.onRegisterForm = this.formBuilder.group({
      'firstName': [null, Validators.compose([
        Validators.required
        
      ])],
      'lastName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ]),
      this.emailAlreadyTaken.bind(this) 
    ],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$')
      ])],
      'role': [null, Validators.compose([
        Validators.required
      ])]
    });

    

    this.register = {
      EmailID:'',
      FirstName:'',
      IMEI:this.device.uuid,
      IsLogged:'',
      LastName:'',
      Password:'',
      RoleId:''
    }

    this.roles.subscribe(data => {
      data.map(e => {
        this.rolesCollection.push(e.payload.doc.data());
      })
    });
    
  }


  emailAlreadyTaken(control){

    this.fs.collection('/Users',ref=>ref.where('EmailID','==',control.value))
    .snapshotChanges().subscribe(data=>{
        if(data.length > 0){
          this.onRegisterForm.controls.email.setErrors({'notUnique':true});
        }
    });
      
  }
  signUp() {
    console.log(this.onRegisterForm)
    this.fs.collection('Users').add(this.register).then((data)=>{
      this.navCtrl.navigateRoot('/login');
    })
    

   
  }

  
  
 
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
