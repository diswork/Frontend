import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { Oferta } from '../../models/oferta.model';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private _usuarioService : UsuarioService) {
    this.empresa = new Empresa('', '', '', '', 'empresa', '', '', '');
    this.oferta = new Oferta('', '', '', '', '', '', [], '', true);
  }

  ngOnInit() {
   
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
        // tslint:disable-next-line:prefer-const
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error';
        }
      }
    )
  }

}
