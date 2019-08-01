import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Input() titulo : string;
  @Input() menuUser : string;
  @Input() menuEmpresa : string;
  @Input() menuAdmin : string;

  constructor() {}

  ngOnInit() {}


}
