import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TokenGenerateService } from 'src/app/services/token-generate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show = false
  hide = false
  login = this.formBuilder.group({
    st_email: ['matias@gmail.com', Validators.required],
    st_password_user: ['123456', Validators.required],
  });
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
  constructor(private formBuilder:FormBuilder, private loginsvc:LoginService,
              public router: Router, private token: TokenGenerateService) { }
 
  ngOnInit(): void {
    setTimeout(() => {
      this.show = true
    }, 60);
  }

  //Funcion para Logueo
  logeo(){
    //valida datos del input
    if(this.login.valid){
      this.loginsvc.login(this.login.get("st_email")?.value, this.login.get("st_password_user")?.value).subscribe({
        next: (x) => {
          var xa:any = x;
          if(xa[0].cod_session_error_log == undefined && xa[0].cod_session_log != undefined){
            this.toast.fire({
                icon: 'success',
                title: 'Acceso exitoso'
           })
           sessionStorage.setItem("Session_key", xa[0].cod_session_log)
           this.datauser()
           //this.router.navigate(["inventory_2"])
          }else{
            this.toast.fire({
              icon: 'error',
              title: 'Credenciales incorrectas'
             })
          }
        },
        error: (e) => {
          this.toast.fire({
            icon: 'error',
            title: 'Intenta mas tarde'
           })
        }
    })
  }
}
  datauser(){
    this.loginsvc.datauser(this.login.value).subscribe({
      next: (x) => {
        var xa:any = x;
        localStorage.setItem("imgpeople", xa.st_ft_perfil)
        localStorage.setItem("fullname", xa.st_user_name)
        localStorage.setItem("email", xa.st_email)
        localStorage.setItem("rol", xa.st_email)
        this.router.navigate(["inventory_2"])
      },
      error: (e) => {
        this.toast.fire({
          icon: 'error',
          title: 'Intenta mas tarde'
         })
      }
  })
  }
  
        
        
        
/*         
        x => {

      }, x =>{

      }) */


              // var username = xa.st_user_name;
        // var date = xa.st_fcrea_user;
        // var rol = xa.st_user_rol;
        // var token = this.token.tGenerate(60);
        // const user = username.toUpperCase().slice(0, 5)
        // const date1 = date.toString().split('-').join('').slice(0,8)
        // const rol2 = rol?.toUpperCase()
        // var token_user = user+ date1 +token+rol2
        // console.log(token);
        // sessionStorage.setItem("User", user)
        // sessionStorage.setItem("Token-User", token_user)

 

}
