import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoDto } from '../dto/todo.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private ID = "/todo"
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<TodoDto[]> {
    return this.httpClient.get<TodoDto[]>(environment.serverUrl + this.ID)
  }

  remove(id: number): Observable<string>{
    return this.httpClient.delete(environment + this.ID + `/${id}`, {
      responseType: "text"
    })
  }
  
}
