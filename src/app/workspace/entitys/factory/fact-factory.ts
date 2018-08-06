import {IFactory} from './i-factory';
import {IFact} from '../entitys/i-fact';
import {FactattribFactory} from './factattrib-factory';

/***/
export class FactFactory implements IFactory {
    /***/
    create(source: Object): IFact {
        return <IFact>{
            entityName: 'fact',
            id: source['id'] ? source['id'] : null,
            name: source['name'] ? source['name'] : null,
            start: source['start'] ? new Date(source['start']) : null,
            end: source['end'] ? new Date(source['end']) : null,
            factattrib: source['factattrib'] ? source['factattrib'].map(x => new FactattribFactory().create(x)) : []
        };
    }
}
