import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {_throw} from 'rxjs/observable/throw';

/**Библиотека*/
export class CommonLib {

    /**Обработка ошибки извлечения данных*/
    static handleError(error: any): ErrorObservable {
        if (error instanceof HttpErrorResponse) {
            let errMsg: string;
            if (error.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                errMsg = `An error occurred: ${error.error.message}`;
                return _throw(new Error(errMsg));
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                errMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
                if (error.status === 401) {
                    return _throw(new UnauthorizedAccess(errMsg));
                } else if (error.status === 404) {
                    return _throw(new NotFound(errMsg));
                } else {
                    return _throw(new Error(errMsg));
                }
            }
        } else {
            return _throw(error);
        }
    }

    /**Извечь данные*/
    static extractData(data: Object) {
        const body = JSON.parse(JSON.stringify(data));
        return body || {};
    }

    /***/
    static getPostHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        // headers.set('Authorization', 'my-auth-token');
        return headers;
    }

    /***/
    static getApiAddr(host: string): string {
        return `${host}/api_log_server/`;
    }
}

/**Не авторизованный доступ*/
export class UnauthorizedAccess {
    /**Конструктор*/
    constructor(public message: string) {
    }
}

/**Не найдено*/
export class NotFound {
    /**Конструктор*/
    constructor(public message: string) {
    }
}
