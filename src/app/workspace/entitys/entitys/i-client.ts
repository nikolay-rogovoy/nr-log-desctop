/***/
import {IEntity} from '../i-entity';

export interface IClient extends IEntity {
    /***/
    name: string;
    /***/
    password: string;
}
