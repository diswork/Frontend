import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-user1',
  templateUrl: './tab-user1.page.html',
  styleUrls: ['./tab-user1.page.scss'],
})
export class TabUser1Page implements OnInit {

public publicaciones : [];

  constructor(private menuCtrl : MenuController) { }

  ngOnInit() {    
    this.menuCtrl.enable(true, "primerMenu");
    this.menuCtrl.enable(false, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }

}
