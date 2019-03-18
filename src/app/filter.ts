import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }

        filter = filter.toLowerCase();
        return items.filter(item => { 
            if(item.name == null) {
                return false;
            }
            return item.name.toLowerCase().indexOf(filter) == 0
        });
    }
}