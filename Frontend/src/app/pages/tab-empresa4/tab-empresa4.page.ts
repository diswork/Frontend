import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from "src/app/models/empresa.model";
import { Oferta } from 'src/app/models/oferta.model';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-empresa4',
  templateUrl: './tab-empresa4.page.html',
  styleUrls: ['./tab-empresa4.page.scss'],
})
export class TabEmpresa4Page implements OnInit {
  @ViewChild('formAddPropuesta') formValueAddPropuesta;

  public url: string;
  public status: string;

  public ofertas: Oferta;
  public oferta: Oferta;

  constructor(private menuCtrl : MenuController) {
    this.ofertas = new Oferta("", "", "", "", "", "", [], "", false);
    this.oferta = new Oferta("", "", "", "", "", "", [], "", false);
  }

  
  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }


}
