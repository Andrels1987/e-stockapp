import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPizzaComponent } from './pages/add-pizza/add-pizza.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ControleMassasComponent } from './pages/controle-massas/controle-massas.component';
import { DisponibilidadeComponent } from './pages/disponibilidade/disponibilidade.component';
import { HomeComponent } from './pages/home/home.component';
import { ListPizzaComponent } from './pages/list-pizza/list-pizza.component';
import { LoginComponent } from './pages/login/login.component';
import { ProducaoComponent } from './pages/producao/producao.component';
import { SaidaComponent } from './pages/saida/saida.component';
import { UsersGuard } from './services/users.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', component: HomeComponent, canActivate: [UsersGuard] },
  { path: 'add-produto', component: AddProductComponent, canActivate: [UsersGuard] },
  { path: 'add-produto/:id', component: AddProductComponent, canActivate: [UsersGuard]  },
  { path: 'list-pizza', component: ListPizzaComponent, canActivate: [UsersGuard]  },
  { path: 'add-pizza', component: AddPizzaComponent, canActivate: [UsersGuard] },
  {
    path: 'controle-massas', component: ControleMassasComponent,
    canActivate: [UsersGuard], 
    children: [
      {path: '', redirectTo: 'disponivel', pathMatch: 'full'},
      {path: 'disponivel', component: DisponibilidadeComponent},
      {path: 'producao', component: ProducaoComponent},
      {path: 'saida', component: SaidaComponent
      },
    ]},
    {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
