
import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Message {
  id: string;
  MessageContent: string;
  Description: string;
  isRolemessage: boolean;
  RoleID:number;
  UserID:number;
}


@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  @Input() msgObj: any;
  @Output()emitPass: EventEmitter<any> = new EventEmitter<any>();


  public msgID: string;
 
  
  users:any;
  roles: any;
  getMsgbyID:any;
  getMsgProm:any;
  usersCollection:any[]=[];
  rolesCollection:any[]=[];
  item: Observable<any>;
  messageCollectionRef: AngularFirestoreCollection<Message>;


  constructor(

    private modalCtrl: ModalController,
    public fs: AngularFirestore
  ) {

    this.users = fs.collection("Users").snapshotChanges();
    
    this.roles = fs.collection("Role").snapshotChanges();

    
    console.log(this)
}

  ngOnInit() {
    this.getMsgbyID = this.msgObj;
    
    this.users.subscribe(data => {
      
      this.usersCollection = data.map(e => {
        
          return {
            id:e.payload.doc.id,
            FirstName: e.payload.doc.data().FirstName,
            LastName: e.payload.doc.data().LastName,
            RoleId: e.payload.doc.data().RoleId
          }
  
      })


    });

    this.roles.subscribe(data => {
     
      data.map(e => {
        
        this.rolesCollection.push(e.payload.doc.data());
          
      })
    });
   
    
  }

  async saveData() {
    console.log(this.getMsgbyID)
    this.fs.collection('Messages').doc(this.getMsgbyID.id).set(this.getMsgbyID).then((ref)=>{console.log(ref)})

    await this.modalCtrl.dismiss();
  }

  closeModal() {
   
    this.modalCtrl.dismiss();
  }

  

  updateMarker(){
    
    //console.log(this.getMsgbyID.doc(this.modalObjContent.id));
    //this.getMsgbyID.doc(this.modalObjContent.id).update(this.modalObjContent);
  }
}
