import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-tab-empresa3',
  templateUrl: './tab-empresa3.page.html',
  styleUrls: ['./tab-empresa3.page.scss'],
})
export class TabEmpresa3Page implements OnInit {

  @ViewChild('fEditarEmpresa') fVEditarEmpresa;

  empresa: Empresa;
  public status;
  

  constructor() { }

  ngOnInit() {
  }

  editarEmpresa(){

  }

}
