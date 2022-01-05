import { AutorizadoGuard } from './guards/autorizado.guard';
import { CardsComponent } from './componentes/cards/cards.component';
import { AdmFuncionarioComponent } from './componentes/adm-funcionario/adm-funcionario.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'adm', component:AdmFuncionarioComponent, canActivate:[AutorizadoGuard]},
  {path:'funcionarios', component:CardsComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
