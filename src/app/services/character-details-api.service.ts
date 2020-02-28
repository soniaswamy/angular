import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Card} from '../models/card-model';

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailsApiService {
  private serviceEndPoint = "https://rickandmortyapi.com/api/character/";
  private filterSubject = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) { }
  
  getAll(): Observable<Card[]>{
    return this.httpClient.get<Card[]>(this.serviceEndPoint);
  }
  getSearchByName(query:string): Observable<Card[]>{
    return this.httpClient.get<Card[]>(this.serviceEndPoint + '?' + query);
  }
  getFilteredByVal(query:string): Observable<Card[]>{
    return this.httpClient.get<Card[]>(this.serviceEndPoint + '?' + query);
  }
  setFilterSubject(value):void {
    this.filterSubject.next(value);
  }
  getFilterSubject():Observable<any>{
    return this.filterSubject.asObservable();
  }
}
