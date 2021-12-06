import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }

  gUsersGen() {
    return this.http.get( this.apiURL + '/UserControl/getUsers'  );
  }

  gUsersFilter(filter: string) {
    return this.http.get( this.apiURL + '/UserControl/getUsersFilter/' + filter );
  }

  delUsers(id: number) {
    return this.http.get( this.apiURL + '/UserControl/delUserCont/' + id );
  }

  putUserCont(id: number, model: any []) {
    return this.http.put( this.apiURL + '/UserControl/putUserCont/' + id, model );
  }

  saveUserCont(model: any []) {
    return this.http.post( this.apiURL + '/UserControl/saveUserCont/', model );
  }

  gusersAudit(user: string, token: string) {
    return this.http.get( this.apiURL + '/UserControl/getUsersForAudit/'+user+'/'+token );
  }

}
