import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  public bioReagentObject:any = [];

  routeBioReagentObj(bioReagentObj:any){
          this.bioReagentObject = bioReagentObj
  }

  returnObject(){
      console.log("From UtilityService",this.bioReagentObject);
      return this.bioReagentObject
  }
}
