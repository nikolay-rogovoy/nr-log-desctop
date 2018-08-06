import {IFactory} from './i-factory';
import {IFactattrib} from '../entitys/i-factattrib';

/***/
export class FactattribFactory implements IFactory {
    /***/
    create(source: Object): IFactattrib {
        return <IFactattrib>{
            id: source['id'] ? source['id'] : null,
            name: source['name'] ? source['name'] : null,
            value: source['value'] ? source['value'] : null
        };
    }
}
