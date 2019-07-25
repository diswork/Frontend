import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Empresa } from "src/app/models/empresa.model";
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Oferta } from 'src/app/models/oferta.model';

@Component({
  templateUrl: './tab-empresa4.page.html',
  styleUrls: ['./tab-empresa4.page.scss'],
  providers: [UsuarioService]
})
export class TabEmpresa4Page implements OnInit {
  @ViewChild('formAddPropuesta') formValueAddPropuesta;

  public url: string;
  public status: string;
  public ofertas: Oferta;
  public empresas: Empresa;

  constructor(public _usuarioService: UsuarioService, private menuCtrl : MenuController) {
    this.ofertas = new Oferta('', '', new Date(), '', '', '', '', [], '', true);
    this.empresas = new Empresa('', '', '', '', 'empresa', '', '', '');
  }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }

  addOferta() {
    console.log(this._usuarioService.getEmpresaLog());
  }

}
