import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }

  getModulesGeneral( estate: string ) {
    return this.http.get( this.apiURL + '/module_tab/geModuleTab/' + estate )
  }
}