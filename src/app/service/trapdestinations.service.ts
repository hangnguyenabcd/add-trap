import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {Trapdestinations} from '../trap-destinations';
import { ITEMS } from '../data-mock'
@Injectable({
  providedIn: 'root'
})
export class TrapdestinationsService {
  trapDes: Trapdestinations[] = ITEMS;
  constructor() {}
// getCarsSmall(id) {
//   return this.http.get<any>('assets/data/cars-small.json')
//       .toPromise()
//       .then(res => <Trapdestinations[]> res.data)
//       .then(data => data);
// }


getAll() {
  return this.trapDes;
}

getData(id: any) {
  for (let i = 0; i < this.trapDes.length; i++) {
    if (this.trapDes[i].id === id) {
      return this.trapDes[i];
    }
  }
}
}