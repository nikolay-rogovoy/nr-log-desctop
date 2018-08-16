export class BaseComponent {
    /***/
    setDatetime(entity: any, columnName: string, value: any) {
        entity[columnName] = new Date(value);
    }
}
