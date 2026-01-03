import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Collection } from '../interfaces/film.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  
  protected httpClient = inject(HttpClient);

  getCollections(): Observable<Collection[]>{
    return this.httpClient.get<Collection[]>(environment.serverUrl + "/collections");
  }

  addCollection(collection: string): Observable<Collection>{
    return this.httpClient.post<Collection>(environment.serverUrl + "/collections", {name: collection});
  }
}
