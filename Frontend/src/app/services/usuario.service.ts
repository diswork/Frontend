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
  private usuario: User;
  private empresa: Empresa;
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
            if(resp['usuario']){
              this.guardarUser(resp['usuario']);
              resolve(true);
            }else{
              this.empresa = resp['empresa']
              this.guardarEmpresa(resp['empresa']);
              resolve(true);

            }
           
          }else{
            this.navCtrl.navigateRoot('/login', {animated : true})
            resolve(false)
          }
        }
      )
    })


  }

  async guardarUser(user: User) {
    this.usuario = user;
    await this.storage.set('user', user);
  }

  async guardarEmpresa(empresas: Empresa) {
    this.empresa = empresas;
    await this.storage.set('empresa', empresas);
  }

  getUserLog() {

    if(!this.usuario._id){
      this.validaToken()
    }

    return { ...this.usuario }
  }

  getEmpresaLog() {

    if(!this.empresa._id){
      this.validaToken()
    }

    return { ...this.empresa }
  }

  limpiarStorage() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.validaToken();
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

  editarUsuario(user : User) : Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);
    return this._http.put(this.url + `/editar-usuario/${user._id}`,params,{headers:headers});
  }

  readOfertaEmpresa(id): Observable<any> {
    console.log(id)
     let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);
 
     return this._http.get(this.url + `/ofertasPorEmpresa/${id}`, {headers:headers});
   }
 

}
