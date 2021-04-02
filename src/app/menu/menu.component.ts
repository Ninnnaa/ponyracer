import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
    navbarCollapsed = true;
    user?: UserModel;
    userEventsSubscription: Subscription | undefined;

    constructor(private  userService: UserService, private router: Router) {}

    toggleNavbar(): void {
        this.navbarCollapsed = !this.navbarCollapsed;
    }

    ngOnInit(): void {
        this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
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
