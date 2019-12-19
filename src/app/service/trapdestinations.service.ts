import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trapdestinations } from '../trap-destinations';
import { ITEMS } from '../data-mock';

@Injectable({
  providedIn: 'root'
})
export class TrapdestinationsService {
  trapDes: Trapdestinations[] = ITEMS;
  url = 'http://localhost:3000/data';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Trapdestinations[]> {
    return this.http.get<Trapdestinations[]>(this.url, this.httpOptions);
  }

  getData(id: any) {
    return this.http.get<Trapdestinations>(this.url + '/' + id, this.httpOptions);
  }
  add(data: Trapdestinations): Observable<any> {
    return this.http.post<Trapdestinations>(this.url, data);
  }

  update(id: string, data: Trapdestinations): Observable<any> {
    return this.http.put<Trapdestinations>(this.url + '/' + id, data, this.httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id, this.httpOptions);
  }
}