import { Component, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/services/folders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  indexpath = 0
  arrpaths:any[] = []
  statefun = false
  varaddfolder = false
  fullscreentpdf = false
  routedefault = "../../../assets/"
  pdfSrc = ""
  namedocument = ""
  viewdocument = false
  pdfdocument = {}
  namefolder = "Directorio"
  codefolder = ""
  za:any = []
  oldname = ""
  arrayPather:any = []
  indexarraypather = -1
  order = "A-Z"
  ordertate = false
  viewicon = "view_module"
  folderview = false
  loading = true
  folders: any = []
  constructor(private folderssvc:FoldersService) { }
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

  ngOnInit(): void {
    var stateview = localStorage.getItem("folderview")
    if(stateview == "true"){
      this.folderview = true
      this.viewicon = "format_list_bulleted"
    }
    this.loaddata("typ")
  }
  addfolder(){
    document.getElementById("inputaddfolder")?.focus(); 
    this.varaddfolder = true
  }
  savefolder(){
    if(!this.statefun){
      this.statefun = true
      var namefolder = <HTMLInputElement> document.getElementById("inputaddfolder"); 
      this.varaddfolder = false
      var idnum = this.folders.length + 1
      this.folderssvc.createfolder(this.codefolder ,  this.codefolder + "_" + idnum.toString().padStart(3, '0'), "0", namefolder.value).subscribe({
        next: (v) => {
          this.statefun = true;
          this.toast.fire({
            icon: 'success',
            title: 'Carpeta cerada con exito'
          })
          this.loaddata("TYP_"+this.codefolder.padStart(3, '0'))
        },
        error: (e) => console.error(e),
    })
    }
  }
  loadfolderpath(code:string, index:number){
    console.log(index)
    console.log(this.arrpaths.length )
    for(let i = index; i < this.arrpaths.length;i++){
      this.arrpaths.splice(i-1, 1)
    }
    this.loaddata(code)
  }
  loaddata(value:string){
    this.loading = true
    this.folders = []
    this.folderssvc.load(value).subscribe(x=>{
      this.loading = false
      this.folders = x
/*       for( let i = 0; i<this.folders.length; i++ ){
        this.folderssvc.objectAnim( i, this.folders[i].id, 'enteranim ease .2s 1', 100 );
      } */
    },()=>{
    this.loading = false
      this.toast.fire({
        icon: 'error',
        title: 'Error al cargar los datos'
      })
    })
  }
  selectview(state:boolean){
    if(state){
      localStorage.setItem("folderview", "false")
      this.viewicon = "view_module"
      this.folderview = false
    }else{
      localStorage.setItem("folderview", "true")
      this.viewicon = "format_list_bulleted"
      this.folderview = true
    }
  }
  changeroder(){
    if(this.ordertate){
      this.order = "A-Z"
      this.ordertate = false
    }else{
      this.order = "Z-A"
      this.ordertate = true
    }
  }
  selectfolder(codigo:String, name:string, type:string){
    if(type == "1"){
      this.viewdocument = true
      this.pdfSrc = this.routedefault + name.split(' ').join('_') + ".pdf"
      this.namedocument = name
    }else{
      this.arrpaths.push({name:name, code:codigo, index:this.indexpath})
      this.indexpath = this.indexpath + 1
      this.indexarraypather = this.indexarraypather + 1
      this.arrayPather.push({obj:this.folders, name:this.namefolder, retro:this.oldname})
      this.namefolder = name
      this.loading = true
      this.folders = []
      this.loading = false
      this.codefolder = codigo.padStart(3, '0')
      this.loaddata("TYP_"+codigo.padStart(3, '0'))
    }
  }
  closedpdf(){
    this.viewdocument = false
    this.pdfSrc = ""
    this.namedocument = ""
    this.fullscreentpdf = false
  }
  returnfolder(){
    this.folders = []
    this.folders = this.arrayPather[this.indexarraypather].obj
    this.namefolder = this.arrayPather[this.indexarraypather].name
    this.indexpath = this.indexpath - 1
    this.arrpaths.splice(this.indexpath, 1)
    this.arrayPather.splice(this.indexarraypather, 1)
    this.indexarraypather = this.indexarraypather - 1;
  }
  funfullscreenpdf(){
    if(this.fullscreentpdf){
      this.fullscreentpdf = false
    }else{
      this.fullscreentpdf = true
    }
  }
}
