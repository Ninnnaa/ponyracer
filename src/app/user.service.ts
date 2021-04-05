import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { JwtInterceptor } from './jwt.interceptor';


@Injectable({
    providedIn: 'root',
})
export class UserService {

    // @ts-ignore
    userEvents = new BehaviorSubject<UserModel>();



    constructor(private http: HttpClient, private jwtInterceptor: JwtInterceptor) {
        this.retrieveUser();
    }

    register(login: string, password: string, birthday: number): Observable<UserModel> {
        const user = {login, password, birthYear: birthday};
        return this.http.post?.<UserModel>(`${environment.baseUrl}/api/users`, user);
    }

    authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
        return this.http.post?.<UserModel>(`${environment.baseUrl}/api/users/authentication`, credentials).
            pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
    }

    storeLoggedInUser(user: UserModel): void {
        window.localStorage.setItem('rememberMe', JSON.stringify(user));
        this.jwtInterceptor.setJwtToken(user.token);
        this.userEvents.next(user);

    }

    retrieveUser(): void {
        const value = window.localStorage.getItem('rememberMe');
        if (value) {
            const user = JSON.parse(value);
            this.jwtInterceptor.setJwtToken(user.token);
            this.userEvents.next(user);
        }
    }

    logout(): void {
        // @ts-ignore
        this.userEvents.next(null);
        window.localStorage.removeItem('rememberMe');
        this.jwtInterceptor.removeJwtToken();
    }

}
