import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoryComponent } from './components/auditory/auditory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FoldersComponent } from './components/folders/folders.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path: "manage_accounts", component: IndexComponent, children: [{path: "", component: UserManagerComponent, outlet: "home"}]},
  {path: "admin_panel_settings", component: IndexComponent, children: [{path: "", component: AuditoryComponent, outlet: "home"}]},
  {path: "inventory_2", component: IndexComponent, children: [{path: "", component: FoldersComponent, outlet: "home"}]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
