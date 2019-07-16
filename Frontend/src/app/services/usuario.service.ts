import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { User } from '../models/user.model';
import { Empresa } from '../models/empresa.model';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private user: User;
  private usuario: User;
  public url: String;

  constructor(public _http: HttpClient, 
              private storage: Storage,
              private navCtrl : NavController) {
    this.url = GLOBAL.url;
  }


  login(login: Login): Observable<any> {
    let params = JSON.stringify(login);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken(){
     this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if(!this.token){
      this.navCtrl.navigateRoot('/login', {animated : true})
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({ 'Authorization': this.token });

      this._http.get(this.url + 'verificaToken', { headers }).subscribe(
        resp => {
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);
          }else{
            this.navCtrl.navigateRoot('/login', {animated : true})
            resolve(false)
          }
        }
      )
    })


  }

  async guardarUser(user: User) {
    this.user = user;
    await this.storage.set('user', user);
  }

  getUserLog() {

    if(!this.usuario.sub){
      this.validaToken()
    }

    return { ...this.usuario }
  }

  limpiarStorage() {
    this.token = null;
    this.storage.clear();
  }

  registrarUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registrar', params, { headers: headers });

  }

  registrarEmpresa(empresa: Empresa): Observable<any> {
    let params = JSON.stringify(empresa);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registrar', params, { headers: headers });
  }

}
