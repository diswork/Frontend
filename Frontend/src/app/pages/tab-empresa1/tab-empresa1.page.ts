import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { Oferta } from '../../models/oferta.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-empresa1',
  templateUrl: './tab-empresa1.page.html',
  styleUrls: ['./tab-empresa1.page.scss'],
})
export class TabEmpresa1Page implements OnInit {

  public url: string;
  public status: string;

  public empresa: Empresa;
  public oferta: Oferta;
  public idEmpresa;

  public ofertas : [];

  constructor(private _usuarioService : UsuarioService,private menuCtrl : MenuController) {
    this.empresa = new Empresa('', '', '', '', 'empresa', '', '', '');
    this.oferta = new Oferta('', '', new Date(), '', '', '', '', [], '', true);
  }

  ngOnInit() {
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);

    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);
  }

  readOfertasEmpresa(id) {
    this._usuarioService.readOfertaEmpresa(id).subscribe(
      response => {
        this.status = 'ok';
        this.ofertas = response.ofertas;
        console.log(this.ofertas);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error';
        }
      }
    )
  }

  doRefresh(event) {
    setTimeout(() => {
    let empresaId = this.empresa._id;
    this._usuarioService.getEmpresa(empresaId).subscribe(
        response => {
          this.empresa = response.empresa;
          console.log(this.empresa);
          this.ofertas = response.ofertas;
          event.target.complete();
        },
        error => {
          if (error) {
            console.log(<any>error);
          }
        }
      )
    }, 2000);
  }

}
