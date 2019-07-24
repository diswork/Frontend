import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-empresa2',
  templateUrl: './tab-empresa2.page.html',
  styleUrls: ['./tab-empresa2.page.scss'],
})
export class TabEmpresa2Page implements OnInit {

  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }


}
