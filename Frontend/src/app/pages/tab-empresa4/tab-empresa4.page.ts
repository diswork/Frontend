import { Component, OnInit, ViewChild } from '@angular/core';
import { Oferta } from '../../models/oferta.model';
import { Empresa } from '../../models/empresa.model';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-tab-empresa4',
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

  constructor(public _usuarioService: UsuarioService) {
    this.ofertas = new Oferta('', '', new Date(), '', '', '', '', [], '', true);
    this.empresas = new Empresa('', '', '', '', 'empresa', '', '', '');
  }

  ngOnInit() {
  }

  addOferta(idEmpresa: any) {
    idEmpresa = this._usuarioService.getEmpresaLog()._id;
    console.log(idEmpresa)
    // this._usuarioService.addPropuesta(this.ofertas, idEmpresa).subscribe(
    //   response => {
    //     this.status = 'Ok';
    //     console.log(response.oferta);
    //     this.formValueAddPropuesta.resetForm();
    //   },
    //   error => {
    //     var errorMessage = <any>error
    //     console.log(errorMessage);
    //     if (errorMessage != null) {
    //       this.status = 'Error';
    //     }
    //   }
    // )
  }

}
