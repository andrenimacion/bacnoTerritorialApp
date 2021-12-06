import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ControlDocumentService {

  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }

  saveAsignnament( model: any [] ) {
    return this.http.post( this.apiURL + '/tasignaciones/saveTasignaciones/', model );
  }

  putAsignnament( model: any [], id: number ) {
    return this.http.put( this.apiURL + '/tasignaciones/putAsignament/' + id, model );
  }

  getAsignament( token: string, userlog: string ) {
    return this.http.get( this.apiURL + '/tasignaciones/getAsignament/' + token + '/' + userlog );
  }

  delAsignament( id: number ) {
    return this.http.get( this.apiURL + '/tasignaciones/delAsignament/' + id );
  }
}
