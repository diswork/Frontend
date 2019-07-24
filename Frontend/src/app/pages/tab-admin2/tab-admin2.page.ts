import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-admin2',
  templateUrl: './tab-admin2.page.html',
  styleUrls: ['./tab-admin2.page.scss'],
})
export class TabAdmin2Page implements OnInit {

 
  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
  }

}
