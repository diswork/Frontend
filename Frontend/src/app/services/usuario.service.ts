import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { User } from '../models/user.model';
import { Empresa } from '../models/empresa.model';
import { NavController } from '@ionic/angular';

import {delay} from 'rxjs/operators'
import { Admin } from '../models/admin.model';
import { Oferta } from '../models/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  public usuario: User;
  public empresa: Empresa;
  public admin: Admin
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

    await this.validaToken();
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
            }else if(resp['empresa']){
              this.guardarEmpresa(resp['empresa']);
              resolve(true);
            }else if(resp['admin']){
              this.guardarAdmin(resp['admin']);
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

  
  limpiarStorage() {
    this.token = null;
    this.usuario = null;
    this.admin = null;
    this.storage.clear();
    this.validaToken();
  }

  //SERVICIOS PARA USUARIO DE TIPO USER

  async guardarUser(user: User) {
    this.usuario = user;
    await this.storage.set('user', user);
  }

  getUserLog() {

    if(!this.usuario._id){
      this.validaToken()
    }

    return { ...this.usuario }
  }
  getToken(){
    return this.token;
  }

  registrarUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registrar', params, { headers: headers });
  }

  editarUsuario(user : User) : Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.put(this.url + `/editar-usuario/${user._id}`,params,{headers:headers}).pipe(delay(500));
  }

  seguirEmpresa(id) : Observable<any>{
    // let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);
    ; 
     const headers = new HttpHeaders({
      'Authorization': this.token
    });
    console.log(headers)
    return this._http.put(this.url + `seguir-empresa/${id}`,{headers:headers});
  }

  getUser(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.get(this.url + `usuario/${id}`,{headers:headers});
  }

  getUsers(): Observable<any>{
    console.log(this.token)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.get(this.url + 'usuarios',{headers:headers});
  }

  deleteUser(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.delete(this.url + `usuario/${id}`,{headers:headers});
  }


  //SERVICIOS PARA USUARIO DE TIPO EMPRESA

  async guardarEmpresa(empresas: Empresa) {
    this.empresa = empresas;

    await this.storage.set('empresa', empresas);
  }

   getEmpresaLog() {

    if(!this.empresa._id){
      this.validaToken()
    }

    return { ...this.empresa }
  }

  registrarEmpresa(empresa: Empresa): Observable<any> {
    let params = JSON.stringify(empresa);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'registrar', params, { headers: headers });
  }

  readOfertaEmpresa(id): Observable<any> {
    console.log(id)
     let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);
 
     return this._http.get(this.url + `/ofertasPorEmpresa/${id}`, {headers:headers});
   }

   getEmpresas(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

     return this._http.get(this.url + 'empresas', {headers}).pipe(delay(2000));
   }

   addPropuesta(oferta : Oferta) : Observable<any>{
     let params = JSON.stringify(oferta);
     let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.token);

     return this._http.post(this.url + 'oferta', params, {headers});   
   }

  //SERVICIOS PARA CATEGORIAS
  getCategorias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.get(this.url + 'categorias', {headers})
  }

  getNiveles():Observable<any>{
    this.cargarToken()

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.get(this.url + 'niveles-academicos', {headers})
  }
 
  //SERVICIOS PARA ADMIN

  async guardarAdmin(admins: Admin) {
    this.admin = admins;
    await this.storage.set('admin', admins);
  }

  getAdminLog() {

    if(!this.admin._id){
      this.validaToken()
    }

    return { ...this.admin }
  }

  crearAdmin(admin: Admin): Observable<any> {
    let params = JSON.stringify(admin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'crear-admin', params, { headers: headers });
  }

  editarAdmin(admin: Admin) : Observable<any>{
    let params = JSON.stringify(admin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.put(this.url + `/editar-Admin/${admin._id}`,params,{headers:headers});
  }

  getAdmin(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',this.token);

    return this._http.get(this.url + `admin/${id}`,{headers:headers});
  }


}
