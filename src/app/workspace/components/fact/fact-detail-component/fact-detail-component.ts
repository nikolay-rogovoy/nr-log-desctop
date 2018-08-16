import {Component, Input, OnInit} from '@angular/core';
import {ServiceProvider} from '../../../services/service-provider';
import {NgForm} from '@angular/forms';
import {BaseComponent} from '../../base-component';
import {IFact} from '../../../entitys/entitys/i-fact';
import {IFactattrib} from '../../../entitys/entitys/i-factattrib';
import {map} from 'rxjs/operators';
import {FactFactory} from '../../../entitys/factory/fact-factory';
import {ColumnFormat, ColumnInfo, FilterInfo} from 'at-grid';
import {IGroupObject} from '../interfaces/i-croup-object';

/***/
@Component({
    moduleId: module.id,
    selector: 'app-fact-detail-component',
    templateUrl: 'fact-detail-component.html'
})
export class FactDetailComponent extends BaseComponent {

    /***/
    @Input()
    groupObject: IGroupObject;

    /***/
    constructor() {
        super();
    }
}
