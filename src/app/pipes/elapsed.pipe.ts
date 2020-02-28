import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsed'
})
export class ElapsedPipe implements PipeTransform {

  transform(data : string) : string {
    return window['moment'](data).fromNow();
}

}
