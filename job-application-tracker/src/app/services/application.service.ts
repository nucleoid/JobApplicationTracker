import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private apiUrl = 'http://localhost:5055/api/applications';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  get(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  create(app: Partial<Application>): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, app);
  }

  update(id: number, app: Partial<Application>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, app);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
