import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
    selector: 'pr-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    user: UserModel;
    userEventsSubscription: Subscription | undefined;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
    }

    ngOnDestroy(): void {
        if (this.userEventsSubscription) {
            this.userEventsSubscription?.unsubscribe();
        }
    }
}
