import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token : string = null;
  public url : String;

  constructor(public _http : HttpClient,private storage : Storage) { 
    this.url = GLOBAL.url;
  }


  login ( login : Login) : Observable<any> {
    let params = JSON.stringify(login);
    let headers = new HttpHeaders().set('Content-Type', 'application/json',);

    return this._http.post(this.url + 'login', params, {headers : headers});
  }

  async guardarToken(token : string){
    this.token = token;
    await this.storage.set('token', token);
  }

  limpiarStorage(){
    this.token = null;
    this.storage.clear();
  }
}
