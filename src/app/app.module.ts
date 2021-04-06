import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './race/race.component';
import { PonyComponent } from './pony/pony.component';
import { FromNowPipe } from './from-now.pipe';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HasErrorDirective } from '../directives/has-error.directive';
import { LoginComponent } from './login/login.component';
import { FocusDirective } from './focus.directive';
import { JwtInterceptor } from './jwt.interceptor';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        RacesComponent,
        RaceComponent,
        PonyComponent,
        FromNowPipe,
        HomeComponent,
        RegisterComponent,
        HasErrorDirective,
        LoginComponent,
        FocusDirective,
        BetComponent,
        LiveComponent
    ],
    imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(ROUTES), ReactiveFormsModule, FormsModule],
    bootstrap: [AppComponent],
    providers: [{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true }]
})
export class AppModule {}
