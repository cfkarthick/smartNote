import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages=[
    {
      title:'Configure Message',
      url:'/menu/msgConfig'
    },
    {
      title:'Scan Note',
      url:'/menu/scanNote'
    }
  ]
  selectedPath = '';
  

  constructor(private route:Router ) {
    this.route.events.subscribe((event:RouterEvent)=>{
        this.selectedPath = event.url;
    });

   
   }

  ngOnInit() {
    
  }

}
