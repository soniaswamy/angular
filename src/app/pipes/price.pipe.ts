import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(records: Array<any>, ...args: unknown[]): unknown {
    if(records && records.length >0 ){
      return records.sort(function(obj1, obj2){
        var sortOrderType = obj1.id > obj2.id;
        if(args[0] == 'desc') {    
            sortOrderType = !sortOrderType;
        }
        if(obj1.id === obj2.id){
              return 0;
            } else if (sortOrderType) {
              return 1;
            } else {
                return -1;
            } 
        });
    }
  }

}
