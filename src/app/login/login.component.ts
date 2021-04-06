import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pr-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    credentials = { login: '', password: '' };
    loginFailed: boolean = false;
    @ViewChild(NgForm, { static: false }) credentialsForm?: NgForm;

    constructor(private userService: UserService, private router: Router) {}

    authenticate(): void {
        this.userService.authenticate(this.credentials).subscribe({
            next: () => this.router.navigate(['/']),
            error: () => (this.loginFailed = true)
        });
    }
}
