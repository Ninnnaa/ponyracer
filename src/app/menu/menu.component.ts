import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription, concat, of, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';


@Component({
    selector: 'pr-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
    navbarCollapsed = true;
    userEvents: Observable<UserModel>;

    constructor(private userService: UserService, private router: Router, private ref: ChangeDetectorRef) {}

    toggleNavbar(): void {
        this.navbarCollapsed = !this.navbarCollapsed;
    }

    ngOnInit(): void {
        this.userEvents = this.userService.userEvents.pipe(
            switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id)
                .pipe(catchError(() => EMPTY))) : of(null))),
            shareReplay()
        );
    }

    logout(event: Event): void {
        event.preventDefault();
        this.userService.logout();
        this.router.navigate(['/']);
    }
}
