import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class UserService {

    // @ts-ignore
    userEvents = new BehaviorSubject<UserModel>();

    constructor(private http: HttpClient) {
        this.retrieveUser();
    }

    register(login: string, password: string, birthday: number): Observable<UserModel> {

        const user = {login, password, birthYear: birthday};

        return this.http.post?.<UserModel>('https://ponyracer.ninja-squad.com/api/users', user);
    }

    authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
        return this.http.post?.<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication', credentials).
            pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
    }

    storeLoggedInUser(user: UserModel): void {
        window.localStorage.setItem('rememberMe', JSON.stringify(user));
        this.userEvents.next(user);

    }

    retrieveUser(): void {
        const user = window.localStorage.getItem('rememberMe');
        if (user){
            this.userEvents.next(JSON.parse(user));
        }
    }

    logout(): void {
        // @ts-ignore
        this.userEvents.next(null);
        window.localStorage.removeItem('rememberMe');
        // @ts-ignore
        event.preventDefault();

    }

}
