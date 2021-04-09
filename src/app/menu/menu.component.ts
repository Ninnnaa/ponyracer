import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription, concat, of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';


@Component({
    selector: 'pr-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
    navbarCollapsed = true;
    user: UserModel;
    userEventsSubscription: Subscription;

    constructor(private userService: UserService, private router: Router) {}

    toggleNavbar(): void {
        this.navbarCollapsed = !this.navbarCollapsed;
    }

    ngOnInit(): void {
        this.userEventsSubscription = this.userService.userEvents
            .pipe(switchMap(user => (user ? concat(of(user),
                this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null))))
            .subscribe(userWithScore => (this.user = userWithScore));
    }

    ngOnDestroy(): void {
        if (this.userEventsSubscription) {
            this.userEventsSubscription?.unsubscribe();
        }
    }
    logout(): void {
        this.userService.logout();
    }
}
