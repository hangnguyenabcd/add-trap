import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Trapdestinations} from '../trap-destinations'
@Injectable({
  providedIn: 'root'
})
export class TrapdestinationsService {

  constructor(private http: HttpClient) {}
getCarsSmall() {
  return this.http.get<any>('assets/data/cars-small.json')
      .toPromise()
      .then(res => <Trapdestinations[]> res.data)
      .then(data => data);
}

}