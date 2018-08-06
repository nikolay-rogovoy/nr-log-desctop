import {IFactory} from './i-factory';
import {IClient} from '../entitys/i-client';

/***/
export class ClientFactory implements IFactory {
    /***/
    create(source: Object): IClient {
        return <IClient>{
            entityName: 'client',
            id: source['id'] ? source['id'] : null,
            name: source['name'] ? source['name'] : null,
            password: source['password'] ? source['password'] : null
        };
    }
}
