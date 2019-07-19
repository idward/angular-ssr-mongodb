import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiService } from 'src/app/api/fetch-api.service';
import { Article } from 'src/app/models/common';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {
  isLoadingResults: boolean = true;
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetchApiService: FetchApiService
  ) {}

  ngOnInit() {
    this.getArticleDetail(this.route.snapshot.params.id);
  }

  getArticleDetail(id: string): void {
    this.fetchApiService.getArticle(id).subscribe((responseData: Article) => {
      this.article = responseData;
      this.isLoadingResults = false;
    });
  }

  deleteArticle(id: string): void {
    this.isLoadingResults = true;
    this.fetchApiService.removeArticle(id).subscribe(
      (responseData: Article) => {
        this.isLoadingResults = false;
        this.router.navigate(['/articles']);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
