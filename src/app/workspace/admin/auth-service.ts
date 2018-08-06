import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AuthService {

    /**Конструктор*/
    constructor() { }

    /**Аутентетифицирован ли пользователь*/
    get authenticated(): boolean {
        if (localStorage.getItem('auth_token')) {
            return true;
        } else {
            return false;
        }
    }

    /**Получить заголовко авторизации*/
    get authorizationHeader(): string {
        if (!this.authenticated) {
            throw new Error('Ошибка получения заголовка авторизации, пользователь не авторизован!');
        }
        return `Bearer<${localStorage.getItem('auth_token')}>`;
    }

    /**Удалить авторизованый токен из источника данных*/
    clear() {
        // Информация о пользователе
        localStorage.removeItem('auth_token');
        localStorage.removeItem('idcustomer');
        localStorage.removeItem('idcustomerkey');
        localStorage.removeItem('customer_name');
        // Информация о подразделении
        localStorage.removeItem('department_idcustomer');
        localStorage.removeItem('department_name');
        localStorage.removeItem('department_customertype_name');
        localStorage.removeItem('department_idcustomertype');
    }
}
