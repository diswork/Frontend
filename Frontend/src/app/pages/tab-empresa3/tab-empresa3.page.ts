import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { MenuController, ActionSheetController } from '@ionic/angular';
import { GLOBAL } from '../../services/global.service';

@Component({
  selector: 'app-tab-empresa3',
  templateUrl: './tab-empresa3.page.html',
  styleUrls: ['./tab-empresa3.page.scss'],
})
export class TabEmpresa3Page implements OnInit {

  @ViewChild('fEditarEmpresa') fVEditarEmpresa;

  empresa: Empresa;
  public habilitarEdicion: boolean;
  public status;
  public url;
  public token;


  constructor(
    private _usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private menuCtrl: MenuController,
    private actionSheetCtrl: ActionSheetController,
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
  }

  habilito() {
    this.habilitarEdicion = true;
  }

  desabilito() {
    this.habilitarEdicion = false;
  }

  // editarEmpresa() {
  //   this._usuarioService.editEmpresa(this.empresa).subscribe(
  //     response => {
  //       this.status = 'Ok'
  //       if (response.empresa) {
  //         console.log(response.empresa);
  //         this.empresa = response.user;
  //       }
  //     },
  //     error => {
  //       if(error) {
  //         console.log(<any>error);
  //         this.status = 'Error';
  //       }
  //     }
  //   )
  // }

}
