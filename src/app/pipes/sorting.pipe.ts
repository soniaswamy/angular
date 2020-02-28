import { Pipe, PipeTransform } from '@angular/core';
interface Comparer {
  (p1:any, p2:any) : number;
}
@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {
  
  private getComparer(attrName): Comparer {
    return function ComparerById(p1:any, p2:any): number {
      if (p1[attrName] < p2[attrName]) return -1;
      if (p1[attrName] > p2[attrName]) return 1;
      if (p1[attrName] === p2[attrName]) return 0;
    }
  }
  private getDescendigComparer(comparer):Comparer {
    return function (p1: any, p2:any) : number {
      return comparer(p1,p2) * -1; 
    }
  } 
  transform(data:any, attrName: string, isDesc: boolean = false, isAsc: boolean = true) {
    // console.log(data);
    let comparer = this.getComparer(attrName);
    if(isDesc) {
      comparer = this.getDescendigComparer(comparer);
      data.sort(comparer);
      return data;
    }
    if(!isDesc) {
      return data;
    }
  }

}
