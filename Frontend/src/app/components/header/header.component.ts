import { Component, OnInit, Input } from '@angular/core';

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
