import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-user4',
  templateUrl: './tab-user4.page.html',
  styleUrls: ['./tab-user4.page.scss'],
})
export class TabUser4Page implements OnInit {

  @ViewChild('lista') lista: IonList;

  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {    
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }
  
  cerrar(){
    this.lista.closeSlidingItems();
  }

  doRefresh(event){
    setTimeout(() => {
            event.target.complete();
    }, 2500);
  }

}
