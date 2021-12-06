import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuditoryService } from 'src/app/services/auditory.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auditory',
  templateUrl: './auditory.component.html',
  styleUrls: ['./auditory.component.css']
})
export class AuditoryComponent implements OnInit {


  @Input() serachdata:any
  input = new FormControl("", Validators.required);
  select = new FormControl(null, Validators.required);
  public arrControllers: any = [ 'codec_audit', 'module_codec', 'local_net_adress', 'client_net_adress', 'user_name', 'data_add', 'rol_user', 'dates' ]
  data:any = []
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  constructor(public utilityService:SearchService,private auditorysvc:AuditoryService) { }
  ngOnInit(){
    
  }

  search(){
    if(this.input.valid && this.select.valid){
      console.log(this.input.value)
      console.log(this.select.value)
      this.auditorysvc.getAudi( this.select.value, this.input.value ).subscribe( mod => {
        this.data = mod;
      })
    }else if(!this.select.valid){
      this.toast.fire({
        icon: 'error',
        title: 'Ingrese datos validos'
      })
    }
  }
  deleteinputsarch(){
    console.log("From Transferpage",this.utilityService.returnObject());
  }
}
