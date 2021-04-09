import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './jwt.interceptor';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent,
    ],
    imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }), NgbCollapseModule],
    bootstrap: [AppComponent],
    providers: [{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true }]
})
export class AppModule {}
