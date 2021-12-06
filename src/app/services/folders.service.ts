import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api/`;
  constructor(public http:HttpClient) { }

  load(tipo:string){
    return this.http.get(this.apiURL + "control_alp_master_tabla/geMasterD/" + tipo + "/master" )
  }
  objectAnim(iterator: any, idObject: string, animationparam: string, time: number) {
    setTimeout( () =>{
      let a = <HTMLDivElement> document.getElementById(`${idObject}`)
      a.style.animation = animationparam;
      a.style.opacity = '1';
    },time * iterator )
  }
  createfolder(codec:string, secuence:string, opt:string, name:string){
    return this.http.get(this.apiURL + "FoldersTree/exAR_FOLDERSSCANN/" + codec + "/" + secuence + "/" + opt + "/" + name)
  }
}