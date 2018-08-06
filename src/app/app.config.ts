import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators/catchError';
import {_throw} from 'rxjs/observable/throw';

/**Конфиг приложения*/
@Injectable()
export class AppConfig {

    /**Конфиг*/
    public config: {
        host: string
    } = null;

    /**Конфигурация окружения*/
    private env: {
        env: string
    } = null;

    /**Конструктор*/
    constructor(private http: HttpClient) {
    }

    /**Загрузить конфигурацию окружения, потом загрузить сам конфиг*/
    public load() {
        return new Promise((resolve, reject) => {
            // Загрузить конфигурацию окружения
            this.http.get('assets/env.json')
                .pipe(catchError((error: any): any => {
                    console.error(`Конфигурационный файл "env.json" не может быть прочитан ${error}`);
                    resolve(true);
                    return _throw(error || 'Ошибка сервера');
                }))
                .subscribe((envResponse) => {

                    // Сохраняем конфиг окружения
                    this.env = envResponse as { env: string };
                    let request: Observable<Object> = null;

                    // Анализируем тип конфига
                    if (this.env.env === 'production') {
                        request = this.http.get(`assets/config.${this.env.env}.json`);
                    } else if (this.env.env === 'development') {
                        request = this.http.get(`assets/config.${this.env.env}.json`);
                    } else {
                        console.error('Файл окружения настроен не правильно!');
                        resolve(true);
                    }

                    // Загружаем нужный конфиг
                    if (request != null) {
                        request
                            .pipe(catchError((error: any) => {
                                console.error(`Ошибка чтения конфигурационного файла: ${this.env.env}`);
                                return _throw(error || 'Server error');
                            }))
                            .subscribe((responseData) => {
                                this.config = responseData;
                                console.log(`Загружена конфигурация ${this.env.env}`);
                                resolve(true);
                            });
                    } else {
                        console.error('Env config file "env.json" is not valid');
                    }
                });
        });
    }
}
