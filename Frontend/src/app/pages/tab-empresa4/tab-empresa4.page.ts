import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from "src/app/models/empresa.model";
import { Oferta } from 'src/app/models/oferta.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tab-empresa4',
  templateUrl: './tab-empresa4.page.html',
  styleUrls: ['./tab-empresa4.page.scss'],
  providers: [EmpresaService]
})
export class TabEmpresa4Page implements OnInit {
  @ViewChild('formAddPropuesta') formValueAddPropuesta;

  public url: string;
  public status: string;

  public ofertas: Oferta;
  public oferta: Oferta;

  constructor(public _empresaService: EmpresaService) {
    this.ofertas = new Oferta("", "", "", "", "", "", [], "", false);
    this.oferta = new Oferta("", "", "", "", "", "", [], "", false);
  }

  ngOnInit() {
  }

  crearPropuesta(crear: NgForm){
    console.log(crear);

    if(crear.invalid){
      this._empresaService.alertarInformativa('Ingrese todos los campos')
    }else {
      this._empresaService.addPropuesta(this.ofertas).subscribe(
        response => {
          if(response){
            console.log(response);
            this.status = 'Ok'
            this.formValueAddPropuesta.resetForm();          
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(error);
          if(errorMessage != null) {
            this.status = 'Error'
          }
        }
      )  
    }    
  }

  listarPropuestas(codigo){
    this._empresaService.readOfertaEmpresa(codigo).subscribe(
      response => {
        if(response){
          console.log(response);
          this.oferta = response;
        }
      }
    )
  }

}
