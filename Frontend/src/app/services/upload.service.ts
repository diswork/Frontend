import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';


@Injectable({
  providedIn: 'root'
})

export class UploadService {


  public url  : string;


  constructor() {
      this.url = GLOBAL.url;
  }

  makeFileRequest(url : string, params : Array<string>, files : Array<File>, token : string, name : string){
      return new Promise (function(resolve, reject){
        var formData : any = new FormData(); //para traer el tipo de dato al abrir la ventana
        var xhr = new XMLHttpRequest; //peticion por medio de http

        for(var i = 0; i < files.length; i++){
          formData.append(name, files[i], files[i].name);
        }

        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){ //stado que dice que si envio los archivos
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);
            }
          }
        }

        xhr.open('POST', url, true); //tipo, url, asincrono
        xhr.setRequestHeader('Authorization', token);//
        xhr.send(formData);//enviamos los datos ya parseados

      })
  }
}
