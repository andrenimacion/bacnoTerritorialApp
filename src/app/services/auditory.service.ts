import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuditoryService {

  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }

  sAudit( module: string, codec_user: string, Observers: string ) {
    return this.http.get( this.apiURL + '/audit/ExecAudit/' + module + '/' + codec_user + '/' + Observers );
  }
  getAudi(ControlerFilter:string, filter:string){
    return this.http.get( this.apiURL + '/audit/getAuditByFilters/' + ControlerFilter + '/' + filter  );   
  }

}
