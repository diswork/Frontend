import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-admin4',
  templateUrl: './tab-admin4.page.html',
  styleUrls: ['./tab-admin4.page.scss'],
})
export class TabAdmin4Page implements OnInit {

  
  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
  }

}
