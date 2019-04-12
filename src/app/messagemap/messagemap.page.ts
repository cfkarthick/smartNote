import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { CreateMessagePage } from '../create-message/create-message.page';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-messagemap',
  templateUrl: './messagemap.page.html',
  styleUrls: ['./messagemap.page.scss'],
})
export class MessagemapPage implements OnInit {
  MsgObserve:any;
  Messages=[];
  MarkerObserve:any;
  Markers=[];
  getMsgbyID:any;
  getMsgProm:any;
  copyObj:any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public fs: AngularFirestore
  ) { 
      this.MsgObserve = fs.collection("Messages").snapshotChanges();
      this.MarkerObserve = fs.collection("Markers").snapshotChanges()
  }

  ngOnInit() {

    this.MsgObserve.subscribe(data => {
      
      this.Messages = data.map(e => {
            return {
              id:e.payload.doc.id,
              IsRolemessage:e.payload.doc.data().IsRolemessage,
              MarkerID:e.payload.doc.data().MarkerID,
              MessageContent:e.payload.doc.data().MessageContent,
              RoleId:e.payload.doc.data().RoleId,
              UserID:e.payload.doc.data().UserID,
              Description:e.payload.doc.data().Description
            }   
        })
    });

    this.MarkerObserve.subscribe(data => {
      
      this.Markers = data.map(e => {
          return {
            id:e.payload.doc.id,
            Description:e.payload.doc.data().Description,
            ImageLocation:e.payload.doc.data().ImageLocation,
            MarkerName:e.payload.doc.data().MarkerName,
            PatternFileLocation:e.payload.doc.data().PatternFileLocation
          }
      });

      console.log(this.Messages)
      console.log(this.Markers)
  });

    
    
  }

  deleteMessage(obj){
    this.Messages.splice(this.Messages.indexOf(obj),1);
    

  }

  async createMsg(){
    const modal = await this.modalCtrl.create({
      component: CreateMessagePage,
      
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('Modal Sent Data :', dataReturned);
      }
    });
    return await modal.present();

  }
  

  async presentMessage(msg: any) {

    this.copyObj = {
      IsRolemessage: msg.IsRolemessage,
      MarkerID: msg.MarkerID,
      MessageContent: msg.MessageContent,
      RoleId: msg.RoleId,
      UserID: msg.UserID,
      id: msg.id,
      Description: msg.Description
    }
    
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      componentProps: { msgObj: this.copyObj }
    });
    return await modal.present();
  }
}
