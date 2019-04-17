import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.page.html',
  styleUrls: ['./create-message.page.scss'],
})
export class CreateMessagePage implements OnInit {
msg : any;


  constructor(
    private modalCtrl : ModalController,
    public fs: AngularFirestore
  ) { 
    
  }

  ngOnInit() {
    this.msg={
      Description:"",
      MessageContent:""
    }
  }

  async CreateMessage() {
    
    this.fs.collection("Messages").add(this.msg);
    
    await this.modalCtrl.dismiss();
  }


  

  closeModal() {
   
    this.modalCtrl.dismiss();
  }

}
