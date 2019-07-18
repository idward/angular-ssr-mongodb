import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/models/common';
import { FetchApiService } from 'src/app/api/fetch-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  isLoadingResults: boolean = true;
  data: Article[] = [];
  displayedColumns: string[] = ['title', 'author'];
  getArticlesSubs: Subscription;

  constructor(public fetchApiService: FetchApiService) {}

  ngOnInit() {
    this.getArticlesSubs = this.fetchApiService.getArticles().subscribe(
      (responseData: Article[]) => {
        this.data = responseData;
        this.isLoadingResults = false;
      },
      error => {
        console.log(error);
        this.isLoadingResults = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.getArticlesSubs) {
      this.getArticlesSubs.unsubscribe();
    }
  }
}
