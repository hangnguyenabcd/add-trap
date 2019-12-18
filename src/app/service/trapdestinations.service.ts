import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trapdestinations } from '../trap-destinations';
import { ITEMS } from '../data-mock';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrapdestinationsService {
  trapDes: Trapdestinations[] = ITEMS;
  // url = 'http://localhost:3000/data';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'my-auth-token'
  //   })
  // };

  constructor(private http: HttpClient) { }
  // getCarsSmall(id) {
  //   return this.http.get<any>('assets/data/cars-small.json')
  //       .toPromise()
  //       .then(res => <Trapdestinations[]> res.data)
  //       .then(data => data);
  // }


  getAll() {
    return this.trapDes;
  }

  // getAll(): Observable<Trapdestinations[]> {
  //   return this.http.get<Trapdestinations[]>(this.url, this.httpOptions);
  // }

  getData(id: any) {
    for (let i = 0; i < this.trapDes.length; i++) {
      if (this.trapDes[i].id === id) {
        return this.trapDes[i];
      }
    }
  }

  // getData(id: any) {
  //   return this.http.get<Trapdestinations[]>(this.url + '/' + id, this.httpOptions);
  // }
  // add(data) {
  //   this.http.post(this.url, data).subscribe();
  // }

  // store(item: Trapdestinations) {
  //   return;
  // }

  // update(item: Trapdestinations) {
  //   return;
  // }

  // delete(id: number) {
  //   return;
  // }
}