import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }

  getRoles( nomtag: string, Property: string ) {
    return this.http.get( this.apiURL + '/control_alp_master_tabla/geMaster/' + nomtag + '/' + Property )
  }

  
}
