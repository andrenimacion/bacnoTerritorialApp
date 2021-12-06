import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private port: any = environment.port;
  private apiURL:string = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient, public router: Router) { }
  
  datauser( user:any[] ) {
    return this.http.post(this.apiURL + "/UserLogin/login", user);
  }

  login( user_log:string, password:string ) {
    return this.http.get(this.apiURL + "/UserControl/getLogs/"+ user_log + "/" + password);
  }
  logout() {
    sessionStorage.removeItem("User");
    sessionStorage.removeItem("Session-Key");
  }

  verificacion () {
    if (sessionStorage.getItem('User') != null) { 
      this.router.navigate(['\dash']);
    }  else {
      this.router.navigate(['\login']);
    }

  }
}