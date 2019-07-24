import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-empresa3',
  templateUrl: './tab-empresa3.page.html',
  styleUrls: ['./tab-empresa3.page.scss'],
})
export class TabEmpresa3Page implements OnInit {

  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }


}
