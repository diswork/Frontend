import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-user2',
  templateUrl: './tab-user2.page.html',
  styleUrls: ['./tab-user2.page.scss'],
})
export class TabUser2Page implements OnInit {

  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
  }
}
