import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestService } from 'rbn-common-lib';

// import { Trapdestinations } from '../trap-destinations';
// import { ITEMS } from '../data-mock';

@Injectable({
  providedIn: 'root'
})
export class TrapdestinationsService {
  // trapDes: Trapdestinations[] = ITEMS;
  apiURL = 'http://localhost:3000/data';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'my-auth-token'
  //   })
  // };

  constructor(private restService: RestService) { }

  getAll(): Observable<any> {
    return this.restService.get(this.apiURL);
  }

  getData(id: any):Observable<any> {
    return this.restService.get(this.apiURL + '/' + id);
  }
  add(data: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.restService.post(this.apiURL, data, headers);
  }

  update(id: string, data: any): Observable<any> {
    return this.restService.put(this.apiURL + '/' + id, data);
  }

  delete(id: string): Observable<any> {
    return this.restService.delete(this.apiURL + '/' + id);
  }
}