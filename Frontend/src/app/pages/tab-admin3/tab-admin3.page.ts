import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-admin3',
  templateUrl: './tab-admin3.page.html',
  styleUrls: ['./tab-admin3.page.scss'],
})
export class TabAdmin3Page implements OnInit {

  
  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
  }

}
