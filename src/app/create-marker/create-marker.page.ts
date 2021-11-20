import { Component, OnInit,Renderer2,ElementRef} from '@angular/core';
import { IonicNativePlugin } from '@ionic-native/core';
import { Camera,CameraOptions  } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ToastController, Platform, LoadingController,DomController,NavController } from '@ionic/angular';
import {AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask} from '@angular/fire/storage'


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { AngularFirestore } from '@angular/fire/firestore';



const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-create-marker',
  templateUrl: './create-marker.page.html',
  styleUrls: ['./create-marker.page.scss'],
})
export class CreateMarkerPage implements OnInit {
  
  imageFileName:any='';
  displayImage:boolean=false;
  id:string;
  MsgObserve:any;
  MessageObj:any;
  
  
  constructor(
    public camera: Camera,
    public INP:IonicNativePlugin,
    
    public plt : Platform,
    public FT:FileTransfer,
    public FTO : FileTransferObject,
    public loadingCtrl:LoadingController,
    public elRef : ElementRef,
    public domCtrl: DomController,
    public render2: Renderer2,
    public route: ActivatedRoute,
    public fs:AngularFirestore,
    public navCtrl :NavController,
    public TC : ToastController
      

  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params.ID;
    console.log(this.route);
    //this.MessageObj = this.fs.collection('Messages').doc(this.id).snapshotChanges();
    this.MsgObserve = this.fs.doc('Messages/'+this.id);
    
    this.MsgObserve.valueChanges().subscribe((data)=>{
      this.MessageObj = data;
     
    })
    
    
  }
  
// this is for test123
 

 
 
async takePicture(type) {
  const loadingController = document.querySelector('ion-content');
    await loadingController.componentOnReady();
    let loader = await this.loadingCtrl.create({
      message: "Please wait",
      spinner: 'crescent',
      duration: 2000
    })
    loader.present();
    var source = this.camera.PictureSourceType.PHOTOLIBRARY
  if(type==='cam'){
    source = this.camera.PictureSourceType.CAMERA;
  }
    var camOptions: CameraOptions = {
        quality: 70,
        destinationType:this.camera.DestinationType.DATA_URL,
        sourceType: source,
        saveToPhotoAlbum:false
        
      };
 
    this.camera.getPicture(camOptions).then((imageData) => {
       this.imageFileName = this.buildMarker(imageData);
    });
 
}
private buildMarker(Data){

  var whiteMargin = 0.1,
  blackMargin = (1 - 2 * whiteMargin) * ((1-0.9)/2),
  innerMargin = whiteMargin + blackMargin,
  canvas = this.render2.selectRootElement(this.render2.createElement('canvas')),
  context = canvas.getContext("2d")

  
  this.render2.setAttribute(canvas, 'height','350');
  this.render2.setAttribute(canvas, 'width',this.plt.width());
  this.render2.setProperty(context,'fillStyle','white');
  context.fillRect(0,0,canvas.width, canvas.height);

  this.render2.setProperty(context,'fillStyle','black');
  context.fillRect(whiteMargin * canvas.width,
		whiteMargin * canvas.height,
		canvas.width * (1-2*whiteMargin),
		canvas.height * (1-2*whiteMargin))
	

	this.render2.setProperty(context,'fillStyle','white');
  context.fillRect(innerMargin * canvas.width,
		innerMargin * canvas.height,
		canvas.width * (1-2*innerMargin),
    canvas.height * (1-2*innerMargin))

    var innerImage = new Image();
    this.render2.setAttribute(innerImage, 'src','data:image/jpeg;base64,'+Data);
    
    innerImage.onload= function(){
      
      
      context.drawImage(innerImage,
          innerMargin * canvas.width,
          innerMargin * canvas.height,
          canvas.width * (1-2*innerMargin),
          canvas.height * (1-2*innerMargin)
      );
      var imgContainer = document.getElementById('imgContainer');
        imgContainer.setAttribute('src',canvas.toDataURL())
      }
     return canvas.toDataURL();
  

}

async SaveFile(){
      var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      
      patternFileString = '',
      image = new Image;

      canvas.width = 16,
      canvas.height = 16;

      for(var orientation = 0; orientation > -2*Math.PI; orientation -= Math.PI/2){
      
        context.save();
        context.clearRect(0,0,canvas.width,canvas.height);
        context.translate(canvas.width/2,canvas.height/2);
        context.rotate(orientation);
        context.drawImage(image, -canvas.width/2,-canvas.height/2, canvas.width, canvas.height);
        context.restore();

      
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        
        if( orientation !== 0 )	patternFileString += '\n'
        
        for(var channelOffset = 2; channelOffset >= 0; channelOffset--){
        
          for(var y = 0; y < imageData.height; y++){
            for(var x = 0; x < imageData.width; x++){

              if( x !== 0 ) patternFileString += ' '

              var offset = (y*imageData.width*4) + (x * 4) + channelOffset
              var value = imageData.data[offset]

              patternFileString += String(value).padStart(3);
            }
            patternFileString += '\n'
          }
        }
      }
  
    this.MsgObserve.update({PatternFileObj : patternFileString, MarkerFileObj : this.imageFileName});
    this.presentToastWithOptions(this.navCtrl);
    

}

goBack(){
  this.navCtrl.navigateBack('msgConfig');
}
 

async presentToastWithOptions(nav) {
  const toast = await this.TC.create({
    message: 'Marker has been Configured Successfully',
    duration: 2000,
    animated:true,
    color:"primary",
    translucent:true
  });
  toast.present()
  toast.onDidDismiss().then((data)=>{
    console.log(data);
    nav.navigateBack('msgConfig');
  })
  
}


}

  
