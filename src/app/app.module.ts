import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginAreaComponent } from './pages/login-area/login-area.component';
import {AngularFireModule} from '@angular/fire'
import { environment } from 'src/environments/environment';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddPizzaComponent } from './pages/add-pizza/add-pizza.component';
import { ListPizzaComponent } from './pages/list-pizza/list-pizza.component';
import { ControleMassasComponent } from './pages/controle-massas/controle-massas.component';
import { DisponibilidadeComponent } from './pages/disponibilidade/disponibilidade.component';
import { ProducaoComponent } from './pages/producao/producao.component';
import { SaidaComponent } from './pages/saida/saida.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginAreaComponent,
    AddProductComponent,
    AddPizzaComponent,
    ListPizzaComponent,
    ControleMassasComponent,
    DisponibilidadeComponent,
    ProducaoComponent,
    SaidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    AngularFireModule
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
