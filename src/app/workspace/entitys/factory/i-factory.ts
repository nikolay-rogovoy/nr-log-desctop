import {IEntity} from '../i-entity';

/***/
export interface IFactory {
    /***/
    create(source: Object): IEntity;
}
