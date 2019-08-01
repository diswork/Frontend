import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { Oferta } from '../../models/oferta.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MenuController, NavController } from '@ionic/angular';

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

  public ofertas: [];
  public publicaciones;
  mensaje: boolean;


  constructor(private _usuarioService: UsuarioService, private menuCtrl: MenuController, public navCtrl: NavController) {
    this.empresa = new Empresa('', '', '', '', 'empresa', '', '', '');
    this.oferta = new Oferta('', '', new Date(), '', '', '', '', [], '', true);

  }

  ngOnInit() {

    this.menuCtrl.enable(false, "primerMenu");
    this.menuCtrl.enable(true, "segundoMenu");
    this.menuCtrl.enable(false, "tercerMenu");
    this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);
  }

  
  doRefresh(event) {
    this.publicaciones = [];
    this.mensaje = false;

    setTimeout(() => {
      this._usuarioService.readOfertaEmpresa(this._usuarioService.getEmpresaLog()._id).subscribe(
        response => {
          if (response.ofertas) {
            this.publicaciones = response.ofertas;
            event.target.complete();
          } else if (response.message === 'no') {
            this.mensaje = true;
            event.target.complete();
          }
        },
        error => {
          if (error) {
            console.log(error as any);
            this.status = 'Error';
          }
        }
      )
    }, 2500);
  }

  irPagina() {
    this.navCtrl.navigateForward('TabEmpresa4Page');
  }

  readOfertasEmpresa(id) {
    this._usuarioService.readOfertaEmpresa(id).subscribe(
      response => {
        this.status = 'ok';
        this.ofertas = response.ofertas;
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

  eliminarOferta(id) {
    this._usuarioService.eliminarOferta(id).subscribe(
      response => {
        if (!response.oferta) {
          this.status = 'ERROR';

        } else {
          this.status = 'SUCCESS';
          this.readOfertasEmpresa(this._usuarioService.getEmpresaLog()._id);


          console.log(response.Promesa)
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'ERROR';
        }
      }
    )
  }

  editarOferta(id) {
    this._usuarioService.editPropuesta(this.oferta, id).subscribe(
      response => {
        if (response.oferta) {
          this.status = 'Ok';
          this.ofertas = response.push(this.oferta);
        }
      },
      error => {
        // tslint:disable-next-line: prefer-const
        let errorMessage = error as any;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error';
        }
      }
    )
  }

}
