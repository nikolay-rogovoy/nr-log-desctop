import {Component, OnInit} from '@angular/core';
import {ServiceProvider} from '../../../services/service-provider';
import {NgForm} from '@angular/forms';
import {BaseComponent} from '../../base-component';
import {IFact} from '../../../entitys/entitys/i-fact';
import {map} from 'rxjs/operators';
import {FactFactory} from '../../../entitys/factory/fact-factory';
import {ColumnFormat, ColumnInfo, FilterInfo} from 'at-grid';
import {IGroupObject} from '../interfaces/i-croup-object';

/***/
@Component({
    moduleId: module.id,
    selector: 'app-sum-fact-component',
    templateUrl: 'sum-fact-component.html'
})
export class SumFactComponent extends BaseComponent implements OnInit {

    /***/
    formParam = <IFormParam> {
        start: new Date(),
        end: new Date()
    };

    /***/
    groupObjects: IGroupObject[] = [];

    /***/
    selectedGroupObject: IGroupObject = null;

    /***/
    errorMessage = null;

    /***/
    gridMetaData: ColumnInfo[] = [
        new ColumnInfo('name', `Наименование`, true, new FilterInfo(''), ColumnFormat.Default, false),
        new ColumnInfo('attribs', `Атрибуты`, true, new FilterInfo(''), ColumnFormat.Default, false),
        new ColumnInfo('quFacts', `Количество фактов`, true, new FilterInfo(''), ColumnFormat.Number, false),
        new ColumnInfo('avgDuration', `Среднее время выполнения`, true, new FilterInfo(''), ColumnFormat.Number, false),
        new ColumnInfo('avgDurationStr', `Среднее время выполнения`, true, new FilterInfo(''), ColumnFormat.Default, false),
    ];

    /***/
    constructor(public service: ServiceProvider) {
        super();
    }

    /***/
    ngOnInit() {
        // this.service.getEntityForField()
    }

    /***/
    load(form: NgForm) {
        if (form.valid) {
            this.service.getRawData(`getlog/${this.formatDate(this.formParam.start)}/${this.formatDate(this.formParam.end)}`)
                .pipe(
                    map((raw: any) => {
                        return raw.result.map(x => new FactFactory().create(x));
                    }),
                    map((facts: IFact[]) => {
                        return this.postProcessing(this.prepareFacts(facts));
                    })
                )
                .subscribe(
                    (result) => {
                        this.groupObjects = result;
                        this.selectedGroupObject = null;
                    }
                );
        }
    }

    /***/
    prepareFacts(facts: IFact[]): IGroupObject[] {
        const groupObjects: IGroupObject[] = [];
        for (const fact of facts) {
            // Развернуть атрибуты в факт
            fact.factattrib.forEach(x => fact[x.name] = x.value);
            // Создать группу на основании факта
            const factAsGroupObject = <IGroupObject> {
                name: fact.name,
                factattrib: fact.factattrib,
                facts: []
            };
            // Может уже есть такая группа
            const groupObject = groupObjects.find(x => this.equalGroup(x, factAsGroupObject));
            if (groupObject) {
                // Есть, добавляем факт в группу
                groupObject.facts.push(fact);
            } else {
                // Нет, создаем новую группу, получаем метаданные ее колонок
                factAsGroupObject.columnInfo = this.getGridMetaData(factAsGroupObject);
                factAsGroupObject.facts.push(fact);
                groupObjects.push(factAsGroupObject);
            }
        }
        return groupObjects;
    }

    /***/
    postProcessing (groupObjects: IGroupObject[]): IGroupObject[] {
        for (const groupObject of groupObjects) {
            groupObject.attribs = groupObject.factattrib.map(x => x.name).join(',');
            groupObject.quFacts = groupObject.facts.length;
            groupObject.avgDuration = this.calcAvgDuration(groupObject.facts);
            groupObject.avgDurationStr = `${groupObject.avgDuration} ms`;
        }
        return groupObjects;
    }

    /***/
    calcAvgDuration(facts: IFact[]) {
        let result = 0;
        let qu = 0;
        facts.forEach(x => {
            if (x.duration) {
                result += x.duration;
                qu++;
            }
        });
        return qu ? result / qu : null;
    }

    /***/
    equalGroup(lhs: IGroupObject, rhs: IGroupObject) {
        if (lhs.name === rhs.name) {
            if (lhs.factattrib.length === rhs.factattrib.length) {
                for (const lAtrib of lhs.factattrib) {
                    const rAtrib = rhs.factattrib.find(x => x.name === lAtrib.name /*&& x.value === lAtrib.value*/);
                    if (rAtrib == null) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /***/
    formatDate(date) {
        const day = date.getDate();
        const monthIndex = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${monthIndex}-${day}`;
    }

    /***/
    getGridMetaData(groupObject: IGroupObject): ColumnInfo[] {
        const gridMetaData: ColumnInfo[] = [
            new ColumnInfo('name', `Name`, true, new FilterInfo(''), ColumnFormat.Default, false),
            new ColumnInfo('start', `Start`, true, new FilterInfo(''), ColumnFormat.Datetime, false),
            new ColumnInfo('duration', `Duration`, true, new FilterInfo(''), ColumnFormat.Number, false)
        ];
        for (const factattrib of groupObject.factattrib) {
            gridMetaData.push(new ColumnInfo(factattrib.name, `Attrib: ${factattrib.name}`,
                true, new FilterInfo(''), ColumnFormat.Default, false));
        }
        return gridMetaData;
    }

    /***/
    selectGroupObject(groupObject: IGroupObject) {
        if (this.selectedGroupObject === groupObject) {
            this.selectedGroupObject = null;
        } else {
            this.selectedGroupObject = groupObject;
        }
    }
}

/***/
interface IFormParam {
    /***/
    start: Date;
    /***/
    end: Date;
}
