import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {catchError, map, pluck} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {IEntity} from '../entitys/i-entity';
import {CommonLib} from '../lib/common-lib';
import {IFactory} from '../entitys/factory/i-factory';

/**Базовый сервис*/
@Injectable()
export class ServiceProvider {

    constructor(public http: HttpClient,
                public appConfig: AppConfig) {
    }

    /**Удалить сущность*/
    deleteEntity(entity: IEntity): Observable<boolean> {
        const entityUrl = CommonLib.getApiAddr(this.appConfig.config.host) + entity.entityName;
        return this.http.delete(entityUrl + '/' + entity.id)
            .pipe(map((data) => {
                    return CommonLib.extractData(data);
                }),
                catchError(CommonLib.handleError)
            );
    }

    /**Удалить сущность*/
    deleteEntitys(entitys: IEntity[]): Observable<boolean> {
        if (entitys.length) {
            const entityUrl = CommonLib.getApiAddr(this.appConfig.config.host) + entitys[0].entityName + '/delete';
            // Массив ключей для удаления
            const deleteData = {
                data: entitys.map(x => x.id)
            };
            return this.http.post(entityUrl, deleteData, {headers: CommonLib.getPostHeaders()})
                .pipe(map(() => {
                        // Все удалилось
                        return of(true);
                    }),
                    catchError(CommonLib.handleError)
                );
        } else {
            return of(true);
        }
    }

    /**Сохранить сущность*/
    postEntity(entity: IEntity): Observable<number> {
        const entityUrl = CommonLib.getApiAddr(this.appConfig.config.host) + entity.entityName;
        const saveData = {
            data: [entity]
        };
        return this.http.post(entityUrl, saveData,
            {headers: CommonLib.getPostHeaders()})
            .pipe(map((result: any) => {
                if (result.result && result.result.length && result.result.length === 1) {
                    return result.result[0].key_value;
                } else {
                    console.error('Ошибка метода postEntity, не правильный ответ сервера:');
                    console.error(result);
                    throw new Error(`Ошибка метода postEntity, не правильный ответ сервера: ${result}`);
                }
            }));
    }

    /**Сохранить сущность*/
    postEntitys(entitys: IEntity[]): Observable<number[]> {
        if (entitys.length) {
            const entityUrl = CommonLib.getApiAddr(this.appConfig.config.host) + entitys[0].entityName;
            const saveData = {
                data: entitys
            };
            return this.http.post(entityUrl, saveData,
                {headers: CommonLib.getPostHeaders()})
                .pipe(map((result: any) => {
                    if (result.result && result.result.length && result.result.length === entitys.length) {
                        return result.result.map(x => x.key_value);
                    } else {
                        console.error('Ошибка метода postEntity, не правильный ответ сервера:');
                        console.error(result);
                        throw new Error(`Ошибка метода postEntity, не правильный ответ сервера: ${result}`);
                    }
                }));
        } else {
            return of([]);
        }
    }

    /**Сохранить сущность*/
    postRequest(entityUrl: string, data: any): Observable<any> {
        entityUrl = CommonLib.getApiAddr(this.appConfig.config.host) + entityUrl;
        const saveData = {
            data: [data]
        };
        return this.http.post(entityUrl, saveData,
            {headers: CommonLib.getPostHeaders()})
            .pipe(map((result: any) => {
                if (result.result) {
                    return result.result;
                } else {
                    console.error('Ошибка метода postEntity, не правильный ответ сервера:');
                    console.error(result);
                    throw new Error(`Ошибка метода postEntity, не правильный ответ сервера: ${result}`);
                }
            }));
    }

    /**Получить сущность*/
    getEntity(identity: number, factory: IFactory): Observable<IEntity> {
        const entityEmpty = factory.create({});
        const entityUrl = CommonLib.getApiAddr(this.appConfig.config.host) + entityEmpty.entityName + '/' + identity;

        return this.http.get(entityUrl)
            .pipe(
                map((data) => {
                    return CommonLib.extractData(data);
                }),
                map(data => {
                    return data.result.data[0];
                }),
                map(data => {
                    const newEntity: IEntity = factory.create(data);
                    return newEntity;
                }),
                catchError(CommonLib.handleError));
    }

    /**Получить сущность*/
    getEntityForField(fieldName: string, fieldValue: string, factory: IFactory): Observable<IEntity[]> {

        // null для REST
        if (!fieldValue) {
            fieldValue = 'null';
        }

        const entityEmpty = factory.create({});
        const entityUrl = `${CommonLib.getApiAddr(this.appConfig.config.host)}${entityEmpty.entityName}/${fieldName}/${fieldValue}`;

        return this.http.get(entityUrl)
            .pipe(
                map((data) => {
                    return CommonLib.extractData(data);
                }),
                pluck('result'),
                pluck('data'),
                map((data: Array<any>) => {
                    const result = [];
                    for (const item of data) {
                        const newEntity: IEntity = factory.create(item);
                        result.push(newEntity);
                    }
                    return result;
                }),
                catchError(CommonLib.handleError));
    }

    /**Получить сущность*/
    getEntityForFieldRange(fieldName: string, fieldValueMin: string, fieldValueMax: string, factory: IFactory): Observable<IEntity[]> {
        // null для REST
        if (!fieldValueMin) {
            fieldValueMin = 'null';
        }
        if (!fieldValueMax) {
            fieldValueMax = 'null';
        }

        const entityEmpty = factory.create({});
        const entityUrl = `${CommonLib.getApiAddr(this.appConfig.config.host)}${entityEmpty
            .entityName}/${fieldName}/${fieldValueMin}/${fieldValueMax}`;

        return this.http.get(entityUrl)
            .pipe(
                map((data) => {
                    return CommonLib.extractData(data);
                }),
                pluck('result'),
                pluck('data'),
                map((data: Array<any>) => {
                    const result = [];
                    for (const item of data) {
                        const newEntity: IEntity = factory.create(item);
                        result.push(newEntity);
                    }
                    return result;
                }),
                catchError(CommonLib.handleError));
    }

    /**Авторизация*/
    authenticate(user: string, pass: string): Observable<boolean> {

        return this.http.post(`${CommonLib.getApiAddr(this.appConfig.config.host)}login`, { user: user, pass: pass },
            {headers: CommonLib.getPostHeaders()})
            .pipe(map((result: any) => {
                if (result.success) {
                    localStorage.setItem('auth_token', result.token);
                    localStorage.setItem('id', result.user.id);
                    localStorage.setItem('name', result.user.name);
                } else {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('id');
                    localStorage.removeItem('name');
                }
                return result.success;
            }));
    }

    /**Получить список*/
    public getEntityList(factory: IFactory): Observable<IEntity[]> {
        const entityEmpty = factory.create({});
        // Урл для обычного списка
        const entityUrl = entityEmpty.entityName;
        return this.getEntityListUrl(entityUrl, factory);
    }

    /**Получить список для URL*/
    getEntityListUrl(entityUrl: string, factory: IFactory): Observable<IEntity[]> {
        // Добавляем имя хоста
        entityUrl = CommonLib.getApiAddr(this.appConfig.config.host) + entityUrl;
        const entityEmpty = factory.create({});
        return this.http.get(entityUrl)
            .pipe(map((res: Response) => {
                return CommonLib.extractData(res);
            }))
            .pipe(map(data => {
                return data.result.data;
            }))
            .pipe(map(data => {
                const result = [];
                for (const item of data) {
                    const newEntity: IEntity = factory.create(item);
                    result.push(newEntity);
                }
                return result;
            }))
            .pipe(catchError(CommonLib.handleError));
    }

    /***/
    getRawData(path: string) {
        const url = CommonLib.getApiAddr(this.appConfig.config.host) + path;
        return this.http.get(url);
    }

    /***/
    postRawData(path: string, body: any): Observable<Object> {
        const url = CommonLib.getApiAddr(this.appConfig.config.host) + path;
        return this.http.post(url, body);
    }
}

