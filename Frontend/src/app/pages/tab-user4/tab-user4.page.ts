import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-tab-user4',
  templateUrl: './tab-user4.page.html',
  styleUrls: ['./tab-user4.page.scss'],
})
export class TabUser4Page implements OnInit {

  @ViewChild('lista') lista: IonList;

  constructor() { }

  ngOnInit() {
  }

  cerrar(){
    this.lista.closeSlidingItems();
  }

}
