import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Miras } from 'model/miras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrosshairsService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCat(cat: string): Observable<Miras[]> {
    return this.http.get<Miras[]>(this.url + 'cat/' + cat);
  }
  searcher(name: string): Observable<Miras[]> {
    return this.http.get<Miras[]>(this.url + 'searcher/' + name);
  }
}
