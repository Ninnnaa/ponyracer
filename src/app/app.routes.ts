import {  Routes } from '@angular/router';

import { RacesComponent } from './races/races.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'races', component: RacesComponent},
    {path: 'login', component: LoginComponent},];





