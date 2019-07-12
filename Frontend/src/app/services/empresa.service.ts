import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GLOBAL } from './global.service';
import { Empresa } from '../models/empresa.model';
import { Oferta } from "../models/oferta.model";
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  token: string;
  public url;

  constructor(public _http: HttpClient, private storage: Storage, public alertController: AlertController) {
    this.url = GLOBAL.url;
  }

  async guardarToken(token: string){
    this.token = token;
    await this.storage.set('token', token);
  }

  limpiarStorage(){
    this.token = null;
    this.storage.clear();
  }

  addPropuesta(oferta: Oferta): Observable<any> {
    let params = JSON.stringify(oferta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'oferta', params, {headers:headers});
  }

  editPropuesta(oferta: Oferta): Observable<any> {
    let params = JSON.stringify(oferta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'ofertasPorEmpresa', params, {headers:headers});
  }

  // deletePropuesta(codigo): Observable<any> {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   return this._http.delete(this.url +)
  // }

  readOfertaEmpresa(codigoEmpresa): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + `ofertasPorEmpresa?codigo=${codigoEmpresa}`, {headers:headers});
  }

  async alertarInformativa(message : string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
