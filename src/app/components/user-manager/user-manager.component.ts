import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { AuditoryService } from 'src/app/services/auditory.service';
import { ControlDocumentService } from 'src/app/services/control-document.service';
import { RolesService } from 'src/app/services/roles.service';
import { TokenGenerateService } from 'src/app/services/token-generate.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  input = new FormControl("", Validators.required);

  /** VARIABLES NG MODEL [INICIO] */
  //#region 
    /**------------------------------- */
    //Nombre de ususario
    public _name_user: string = '';
    /**------------------------------- */
    //Email de ususario
    public _email_user: string = '';
    /**------------------------------- */
    //Telefono de ususario
    public _telf_user:  any = '';
    /**------------------------------- */
    //Password de ususario
    public _pass_user:  string = '';
    /**------------------------------- */
    //Roles de ususario
    public _roles_user: string = '';
    /**------------------------------- */
    //Secretarias de ususario
    public _secret_user: string = '';
    /**------------------------------- */
    //CHECK Input tipos
    public _type_docu: any = '';
    public _bool_checked: boolean = false;    
    /**------------------------------- */
  //#endregion
  searchtext = ""
  /** ARRAYS PARA SERVICIOS USERS [INICIO]*/
  //#region
  // VARIABLES PARA USUARIOS
    public arrUsersGen:   any = [];
    public arrUsFil:      any = [];
    public cantUsers:  number = 0;
    // VARIABLES PARA ROLES
    public arrRolesGen:   any = [];
    public cantRoles:  number = 0;
    // VARIABLES PARA CLASES[TIPOS]
    public arrTipos:      any = [];
    public cantTipos:  number = 0;
    // VARIABLES SECRETARIAS
    public arrSecret:      any = [];
    public cantSecret:  number = 0;
    // VARIABLES FOLDERS
    public arrfolders:     any = [];
    public cantFolders: number = 0;
  //#endregion

  //Variable para el input password [INICIO]
  public hide: boolean = true;

  // Variable para validación de email [INICIO]
  public email = new FormControl('', [Validators.required, Validators.email]);

  // Varaible que almacenara el codigo de usuario creado [INICIO]
  public codecUserCreate: any = '';


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor( 
    private rols: RolesService,public dialog: MatDialog,
               private us: UserManagerService, 
               private token: TokenGenerateService,
               private tdocu: ControlDocumentService,
               private asign: AssignmentsService,
               private auditS: AuditoryService ) { }

  ngOnInit(): void {
    this.genUsers();

    //Roles
    this.gClases( 'ROL_01', 'master',  0 );
    
    //Clases
    this.gClases( 'TYP',    'master',  1 );
    
    //Secretarias
    this.gClases( 'SECR',   'master',  2 );



  }
  deleteinputsarch(){
    
  }
  search(){

  }
  genUsers() {
    this.us.gUsersGen().subscribe( users => {
      this.arrUsersGen = users;
      console.log(this.arrUsersGen)
      this.cantUsers   = this.arrUsersGen.length;
    })
  }

  gUsersFilter(filter: string) {
    this.us.gUsersFilter( filter ).subscribe( usfill => {
      this.arrUsFil = usfill;
    })
  }
  gClases( nomtag: string, Properties: string, opt: number ) {

    if( opt == 0 ) {
      this.rols.getRoles(nomtag, Properties).subscribe( R => {
        this.arrRolesGen = R;
        this.cantRoles = this.arrRolesGen.length;
        //console.log(this.arrRolesGen);
        //console.log(this.cantRoles);
      })
    }

    else if( opt == 1 ) {
      this.rols.getRoles(nomtag, Properties).subscribe( T => {
        this.arrTipos = T;
        this.cantTipos = this.arrTipos.length;
        //console.log(this.arrTipos);
        //console.log(this.cantTipos);
      })
    }

    else if( opt == 2 ) {
      this.rols.getRoles(nomtag, Properties).subscribe( S => {
        this.arrSecret = S;
        this.cantSecret = this.arrSecret.length;
        //console.log(this.arrSecret);
        //console.log(this.cantSecret);
      })
    }
    
  }


  catchDataB(scret: string) {
    this._secret_user = scret;
    //console.log(this._secret_user);
  }

  asingDataCheck( a: any ) {
    this._type_docu = a;
    //console.log(this._type_docu);
  }

  
  sUsers( st_user_name: string, st_user_rol: string, st_email: string, st_ft_perfil: string, st_password_user: string ) {

    this.codecUserCreate = sessionStorage.getItem('User')+'_'+ this.token.tGenerate(20)+'_'+new Date().getFullYear();

    //console.log(st_password_user);
    
    // 'A',
    // st_tipo: string,

    let tp: any = ''
    if( st_user_rol == 'Admin' ) {
      tp = 'A'
    }
    else {
      tp = 'N'
    }

    let x : any = {
      //id: 0, 
      st_user_name: st_user_name,
      st_user_rol: st_user_rol,
      st_email: st_email,
      st_fcrea_user: new Date(),
      st_tipo: tp,
      st_ft_perfil: st_ft_perfil,
      st_codec_user: this.codecUserCreate,
      st_password_user: st_password_user
    }

    console.log(x);
    
    this.us.saveUserCont(x).subscribe( sus => {
      this.genUsers();
      //console.log(sus);
    })

  }

  delUsers(id: number) {
    this.us.delUsers( id ).subscribe( delUs => {
      //console.log('BORRADO');
      this.genUsers();
    })
  }

  getUserEditAsign( st_user_name: string, st_email: string, st_user_rol: string ) {
    this._name_user  = st_user_name;
    this._roles_user = st_user_rol;
    this._email_user = st_email;
    this.autorizefolder()
  }

  editUsers(id: number, st_codec_user: string, st_user_name: string, st_user_rol: string, st_email: string, st_tipo: string, st_ft_perfil: string, st_password_user: string) {

    const id_nuser: any = <HTMLInputElement> document.getElementById(`usname-${id}`);
    const id_rol  : any = <HTMLInputElement> document.getElementById(`usrol-${id}` );
    const id_email: any = <HTMLInputElement> document.getElementById(`usmail-${id}`);
    const id_pass : any = <HTMLInputElement> document.getElementById(`passw-${id}` );

    let x : any = {
      id: id, 
      st_user_name: id_nuser.value,
      st_user_rol: id_rol.value,
      st_email: id_email.value,
      st_fcrea_user: new Date(),
      st_tipo: st_tipo,
      st_ft_perfil: st_ft_perfil,
      st_codec_user: st_codec_user,
      st_password_user: id_pass.value
    }

    console.log(x);

    this.us.putUserCont(id, x).subscribe( x => {
      //console.log('UPDATE');
      //console.log(x);
      this.genUsers();
    })

  }

  sCarpetas( indice: string) {

    let tipoDocu: any = {
      carpeta_name:     indice,
      codec_user_asign: this.codecUserCreate, 
      token_log_user:   sessionStorage.getItem('token_log_user'),
      ff_asignament:    new Date()
    }

    console.log(tipoDocu);
   
    this.tdocu.saveAsignnament( tipoDocu ).subscribe( tdoc => {
      console.log('DOCS GUARDADO ');  
      //console.log(tdoc);  
    } )

  }

  // nomtag = 'ROL_01' obtengo roles, nomtag = 'TYP' obtengo tipos o clases


  public arrAudit: any = [];
  // Al clickear en los módulos... Lanza HTTP POST AUDITORÍA
  aud( modules: string ) {
    
    const xUser: any = sessionStorage.getItem('TokenUser');
    this.auditS.sAudit( modules, xUser, 'clickeo' ).subscribe( mod => {
      this.arrAudit = mod;
      console.log( this.arrAudit );
    })

  }
  adduser(){
    const dialogRef = this.dialog.open(addUserComponent, {
      width: '380px',
      data: {name: "none", animal: "none"},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.genUsers();
    });
  }
  autorizefolder(): void {
    const dialogRef = this.dialog.open(folderAuthorizationComponent, {
      panelClass: 'custom-dialog-container',
      width: '380px',
      data: {folders: this.arrTipos, name: this._name_user, rol: this._roles_user},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

@Component({
  selector: 'addUserComponent',
  templateUrl: 'add_user.component.html',
  styleUrls: ['add_user.component.css']
})
export class addUserComponent {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public cantUsers:  number = 0;
      public arrUsersGen:   any = [];
  public cantSecret:  number = 0;
  public cantRoles:  number = 0;
  public arrSecret:      any = [];
  
    public cantTipos:  number = 0;
    public arrTipos:      any = [];
      public arrRolesGen:   any = [];
      //Nombre de ususario
      public _name_user: string = '';
      /**------------------------------- */
      //Email de ususario
      public _email_user: string = '';
      /**------------------------------- */
      //Telefono de ususario
      public _telf_user:  any = '';
      /**------------------------------- */
      //Password de ususario
      public _pass_user:  string = '';
      /**------------------------------- */
      //Roles de ususario
      public _roles_user: string = '';
      /**------------------------------- */
      //Secretarias de ususario
      public _secret_user: string = '';
      /**------------------------------- */
      //CHECK Input tipos
      public _type_docu: any = '';
      public codecUserCreate: any = '';
      hide = false
      public _bool_checked: boolean = false;   
  constructor(public auditS:AuditoryService,private token: TokenGenerateService,private us: UserManagerService, private rols: RolesService,
    public dialogRef: MatDialogRef<addUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {


    // Usuarios Generales
    this.genUsers();

    //Roles
    this.gClases( 'ROL_01', 'master',  0 );
    
    //Clases
    this.gClases( 'TYP',    'master',  1 );
    
    //Secretarias
    this.gClases( 'SECR',   'master',  2 );

    //this.prueba();

  }
  
  catchDataB(scret: string) {
    this._secret_user = scret;
    //console.log(this._secret_user);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  catchData(a: string) {
    this._roles_user = a;
    //console.log(this._roles_user);

    if( this._roles_user === 'admin' ) {
      console.log( 'Tienes: ' + this.cantTipos );
      this._bool_checked = true;
    }

    else {
      this._bool_checked = false;
    }
  }

  gClases( nomtag: string, Properties: string, opt: number ) {

    if( opt == 0 ) {
      this.rols.getRoles(nomtag, Properties).subscribe( R => {
        this.arrRolesGen = R;
        this.cantRoles = this.arrRolesGen.length;
        //console.log(this.arrRolesGen);
        //console.log(this.cantRoles);
      })
    }

    else if( opt == 1 ) {
      this.rols.getRoles(nomtag, Properties).subscribe( T => {
        this.arrTipos = T;
        this.cantTipos = this.arrTipos.length;
        //console.log(this.arrTipos);
        //console.log(this.cantTipos);
      })
    }

    else if( opt == 2 ) {
      this.rols.getRoles(nomtag, Properties).subscribe( S => {
        this.arrSecret = S;
        this.cantSecret = this.arrSecret.length;
        //console.log(this.arrSecret);
        //console.log(this.cantSecret);
      })
    }
    
  }
  getUserEditAsign( st_user_name: string, st_email: string, st_user_rol: string ) {
    this._name_user  = st_user_name;
    this._roles_user = st_user_rol;
    this._email_user = st_email;
  }
  genUsers() {
    this.us.gUsersGen().subscribe( users => {
      this.arrUsersGen = users;
      this.cantUsers   = this.arrUsersGen.length;
    })
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  saveuser(st_user_name: string, st_user_rol: string, st_email: string, st_ft_perfil: string, st_password_user: string, bit:any){
    this.codecUserCreate = sessionStorage.getItem('User')?.toString().slice(0,3)+'_'+ this.token.tGenerate(20)+'_'+new Date().getFullYear();

    //console.log(st_password_user);
    
    // 'A',
    // st_tipo: string,

    let tp: any = ''
    if( st_user_rol == 'Admin' ) {
      tp = 'A'
    }
    else {
      tp = 'N'
    }

    let x : any = {
      //id: 0, 
      st_user_name: st_user_name,
      st_user_rol: st_user_rol,
      st_email: st_email,
      st_fcrea_user: new Date(),
      st_tipo: tp,
      st_ft_perfil: bit,
      st_codec_user: this.codecUserCreate,
      st_password_user: st_password_user
    }

    console.log(x);
    
    this.us.saveUserCont(x).subscribe( sus => {
      this.genUsers();
      this.dialogRef.close();
      //console.log(sus);
    })
  }

  sUsers( st_user_name: string, st_user_rol: string, st_email: string, st_ft_perfil: string, st_password_user: string ) {

    const filesSelected:any = document.getElementById('img') as HTMLInputElement;

    const fileId = filesSelected.files;

    let base;

    if (fileId.length > 0) {

      const fileToLoad = filesSelected[0];

      const fileReader = new FileReader();


      fileReader.onloadend = () => {

        var bit = fileReader.result;
        this.saveuser(st_user_name, st_user_rol, st_email, st_ft_perfil, st_password_user, bit)


      };
      const a = fileReader.readAsDataURL(fileId[0]);
    }
}
  public arrAudit: any = []; 
  aud( modules: string ) {
    
    const xUser: any = sessionStorage.getItem('TokenUser');
    console.log( modules );
    this.auditS.sAudit( modules, xUser, 'clickeo' ).subscribe( mod => {
      this.arrAudit = mod;
      console.log( this.arrAudit );
    })

  }
}

@Component({
  selector: 'folderAuthorizationComponent',
  templateUrl: 'folder_authorization.component.html',
  styleUrls: ['folder_authorization.component.css'], 
})
export class folderAuthorizationComponent {

  name = ""
  rol = ""
  folders:any = []
  constructor(
    public dialogRef: MatDialogRef<folderAuthorizationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    this.folders = this.data.folders
    this.name = this.data.name
    this.rol = this.data.rol
  }

  closed(): void {
    this.dialogRef.close();
  }
}