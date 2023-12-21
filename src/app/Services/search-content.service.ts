import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../Models/Person';

@Injectable({
  providedIn: 'root'
})
export class SearchContentService {

  private apiUrl = 'https://localhost:7199/api/SearchPerson';
  constructor(private http: HttpClient) { }

  searchPeople(searchTerm:string): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}?searchTerm=${searchTerm}`);
  }
}
