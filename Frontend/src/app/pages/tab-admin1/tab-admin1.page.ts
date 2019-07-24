import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-admin1',
  templateUrl: './tab-admin1.page.html',
  styleUrls: ['./tab-admin1.page.scss'],
})
export class TabAdmin1Page implements OnInit {

  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(true, "tercerMenu");
  }

}
