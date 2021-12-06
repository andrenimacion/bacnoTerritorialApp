import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ModuleService } from 'src/app/services/module.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  arrdatos:any[] = []
  modefilder = ""
  shownot = false
  inputsearch = ""
  filterstate = true
  public arrControllers: any = [ {name:"Codigo", value: 'codec_audit'}, {name:"Modulo", value: 'module_codec'},{name:"Local", value: 'local_net_adress'}, {name:"Direccion", value: 'client_net_adress'}, {name:"Username", value: 'user_name'}, {name:"Agregado", value: 'data_add'},{name:"Rol", value: 'rol_user'},{name:"Fecha", value: 'dates'} ]
 rolefilter = "Filtro"
 holderinput = false
 arramenu:any = []
 iconmenu = "menu"
 namemodule = ""
 fullname:any = "Nombre Usuario"
 image:any = "../../../assets/people.png"
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
  constructor(private utilityService:SearchService,private route:ActivatedRoute,private router:Router, private loginservice:LoginService, private modulesvc:ModuleService) { }

  ngOnInit(): void {
    setTimeout(() => {
      var name:any = localStorage.getItem("fullname")?.toLowerCase()
      let arr = name.split(' '); this.fullname = ""
      for(let i = 0; i < arr.length; i++){ this.fullname += " " + arr[i].slice(0,1).toUpperCase() + arr[i].slice(1,) }
      this.image = localStorage.getItem("imgpeople")
      if(this.image == null  || this.image == undefined){this.image = "../../../assets/people.png"}
      var route = this.route.snapshot.routeConfig?.path || "inventory_2"
      this.funselectitem(route)
      if(route == "admin_panel_settings"){this.filterstate = true}else{this.filterstate = false}
    }, 250);
    this.modulesvc.getModulesGeneral("1.").subscribe(x=>{
      this.arramenu = x
      var route = this.route.snapshot.routeConfig?.path || "inventory_2"
      if(this.arramenu.find((x:any) => x.icon_module === route).name_module){
        this.namemodule = "Buscar en " + this.arramenu.find((x:any) => x.icon_module === route).name_module
        this.holderinput = true
      }else{
        this.namemodule = ""
      }
    })
  }
  funselectitem(name:string){
    var div = <HTMLDivElement> document.getElementById("div"+name)
    var icon = <HTMLSpanElement> document.getElementById("icon"+name)
    var text = <HTMLDivElement> document.getElementById("text"+name)
      div.style.background = "#198754"
      div.style.opacity = "1"
      icon.style.color = "white"
      text.style.color = "white"
    }
    redireto(name:string){
      this.router.navigate([name])
    }
    selectfilter(arr:any){
      this.rolefilter = arr.name
      this.modefilder = arr.value
    }
  changeicon(){
    if(this.iconmenu == "menu"){ this.iconmenu = "clear" }else{  this. iconmenu = "menu"  }
  }
  logout(){
    this.loginservice.logout()
  }
  serach(){
    if(this.inputsearch.length > 0 && this.modefilder.length > 2){
      this.arrdatos = [{input: this.inputsearch, filder:this.modefilder }]
      this.utilityService.routeBioReagentObj(this.arrdatos);
    }else if(this.inputsearch.length > 0 && this.modefilder.length < 2 && this.shownot == false){
      this.toast.fire({
        icon: 'error',
        title: 'Selecione un filtro'
      })
      this.shownot = true
    }
  }
}


