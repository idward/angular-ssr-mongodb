import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from '../models/common';

const BASIC_URL = '/api';

@Injectable({
  providedIn: 'root'
})
export class FetchApiService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${BASIC_URL}/articles`).pipe(
      map(articles => articles),
      catchError(this.errorHandler)
    );
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${BASIC_URL}/articles/${id}`).pipe(
      map(article => article),
      catchError(this.errorHandler)
    );
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${BASIC_URL}/articles/new`, article).pipe(
      map(articleRes => articleRes),
      catchError(this.errorHandler)
    );
  }

  updateArticle(id: string, article: Article): Observable<Article> {
    return this.http.post(`${BASIC_URL}/articles/update/${id}`, article).pipe(
      map(articleRes => articleRes),
      catchError(this.errorHandler)
    );
  }

  removeArticle(id: string): Observable<Article> {
    return this.http.get(`${BASIC_URL}/articles/delete/${id}`).pipe(
      map(article => article),
      catchError(this.errorHandler)
    );
  }

  // handle error
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    return of(error.message || 'Error occurred');
  }
}
