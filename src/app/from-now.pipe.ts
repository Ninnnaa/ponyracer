import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
    transform(value: unknown, ...args: Array<any>): unknown {
        return value + ' from now';
    }
}
