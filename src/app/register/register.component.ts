import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
    selector: 'pr-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    registrationFailed: boolean = false;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
        this.form = this.fb.group({
            login: fb.control('', [Validators.required, Validators.minLength(3)]),
            password: fb.control('', Validators.required),
            confirm: fb.control('', Validators.required),
            birthday: this.fb.control(2000, [Validators.min(1900), Validators.max(new Date().getFullYear())]),
        }, {
            validators: RegisterComponent.passwordMatch as AbstractControlOptions,
        });
    }

    static passwordMatch(group: FormGroup): void {
        const password = group.get('password')?.value;
        const confirm = group.get('confirm')?.value;
        if (password !== confirm) {
            group.get('confirm')?.setErrors({NoPasswordMatch: true});
        }
    }

    ngOnInit(): void {
    }

    register(): void {

        const test = parseInt(this.form.value.birthday, 10);
        this.userService.register(this.form.value.login, this.form.value.password, test)
            .subscribe({
                next: () => this.router.navigate(['/']),
                error: () => (this.registrationFailed = true),
            });
        console.log(typeof this.form.value.login);
    }

}
