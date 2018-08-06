import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {ServiceProvider} from '../../services/service-provider';

@Component({
    moduleId: module.id,
    selector: 'app-auth-component',
    templateUrl: 'auth-component.html'
})
export class AuthComponent {

    /**Имя пользователя*/
    public username: string;

    /**Паролль*/
    public password: string;

    /**Ошибки*/
    public errorMessage: string;

    /**Конструктор*/
    constructor(public router: Router,
                public service: ServiceProvider) {
    }

    /**Аунтификация пользователя*/
    authenticate(form: NgForm) {
        if (form.valid) {
            this.service.authenticate(this.username, this.password)
                .subscribe((response: boolean) => {
                    if (response) {
                        this.router.navigateByUrl('/');
                    } else {
                        this.errorMessage = 'Некорректный пароль или имя пользователя';
                    }
                });
        } else {
            this.errorMessage = 'Вы не ввели имя пользователя или пароль';
        }
    }
}
