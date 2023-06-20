import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EatComponent } from './components/eat/eat.component';
import { PlayComponent } from './components/play/play.component';
import { RelaxComponent } from './components/relax/relax.component';
import { LoginComponent } from './auth/login/login.component';
import {Route, RouterModule} from '@angular/router';
import { RegisterComponent } from './auth/register/register.component'; // importo il modulo {Route, RouterModule} per gestire le rotte
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';


const routes: Route[] = [ //creo una costante di :tipo Route per definire le rotte
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'eat',
    component: EatComponent,
  },
  {
    path: 'play',
    component: PlayComponent,
  },
  {
    path: 'relax',
    component: RelaxComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EatComponent,
    PlayComponent,
    RelaxComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes), // dichiaro negli imports che sto utilizzando il RouterModule
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
