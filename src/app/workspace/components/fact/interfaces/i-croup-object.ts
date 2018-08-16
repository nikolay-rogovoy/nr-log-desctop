/***/
import {IFactattrib} from '../../../entitys/entitys/i-factattrib';
import {IFact} from '../../../entitys/entitys/i-fact';
import {ColumnInfo} from 'at-grid';

export interface IGroupObject {
    /***/
    name: string;
    /***/
    factattrib: IFactattrib[];
    /***/
    facts: IFact[];
    /***/
    columnInfo: ColumnInfo[];
    /***/
    attribs: string;
    /***/
    quFacts: number;
    /***/
    avgDuration: number;
    /***/
    avgDurationStr: string;
}
