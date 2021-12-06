import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenGenerateService {

  constructor() { }


   //Generador de token
   tGenerate(cant: number) {
    let caracteres = "abcdefghijkmnpqrtuvwxyz_ABCDEFGHJKMNPQRTUVWXYZ2346789-";
    let token = "";
    for (let i=0; i<cant; i++) {
      token += caracteres.charAt(Math.floor(Math.random()*caracteres.length));  
    }
    return token; 

  }


  
}
