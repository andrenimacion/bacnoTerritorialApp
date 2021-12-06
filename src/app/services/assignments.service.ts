import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }

  sAsign( model: any [] ) {
    return this.http.post( this.apiURL + '/tasignaciones/saveTasignaciones', model  );
  }
  
  gAsign( token: string, userlog: string ) {
    return this.http.get( this.apiURL + '/tasignaciones/getAsignament/' + token + '/' + userlog );
  }
  
  pAsign( id:number, model: any [] ) {
    return this.http.put( this.apiURL + '/tasignaciones/putAsignament/' + id, model );
  }
  
  dAsign( id: number ) {
    return this.http.get( this.apiURL + '/tasignaciones/delAsignament/' + id );
  }
}
