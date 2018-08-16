import {IFactattrib} from './i-factattrib';
import {IEntity} from '../i-entity';

/***/
export interface IFact extends IEntity {
    /***/
    start: Date;
    /***/
    end: Date;
    /***/
    name: string;
    /***/
    factattrib: IFactattrib[];
    /***/
    duration: number;
}
