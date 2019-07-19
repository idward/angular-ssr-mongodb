import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Article } from '../../models/common';
import { Observable } from 'rxjs';
import { FetchApiService } from 'src/app/api/fetch-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<Article> {
  constructor(private fetchApiService: FetchApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Article | Observable<Article> | Promise<Article> {
    return this.fetchApiService.getArticle(route.params.id);
  }
}
