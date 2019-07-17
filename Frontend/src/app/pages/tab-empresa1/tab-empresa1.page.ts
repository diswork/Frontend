import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';
import { Oferta } from '../../models/oferta.model';

@Component({
  selector: 'app-tab-empresa1',
  templateUrl: './tab-empresa1.page.html',
  styleUrls: ['./tab-empresa1.page.scss'],
  providers: [EmpresaService]
})
export class TabEmpresa1Page implements OnInit {

  public url: string;
  public status: string;

  public empresa: Empresa;
  public oferta: Oferta;

  constructor(public _empresaService: EmpresaService) {
    this.empresa = new Empresa('', '', '', '', 'empresa', '', '', '');
    this.oferta = new Oferta('', '', '', '', '', '', [], '', true);
  }

  ngOnInit() {
    
  }

  readOfertasEmpresa(codigo) {
    this._empresaService.readOfertaEmpresa(codigo).subscribe(
      response => {
        this.status = 'ok';
        console.log(response);
        this.oferta = response.json();
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
