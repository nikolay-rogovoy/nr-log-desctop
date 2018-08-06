import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth-service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    /**Конструктор*/
    constructor(public auth: AuthService) {
    }

    /***/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Если пользователь авторизован
        if (this.auth.authenticated) {
            // Получить заголовок с токеном
            const authHeader = this.auth.authorizationHeader;
            // Клонировать запрос и добавить новый заголовок
            const authReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                }
            });
            // Передать клонированый запрос вместо оригинального
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
