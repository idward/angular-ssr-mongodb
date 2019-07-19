import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchApiService } from 'src/app/api/fetch-api.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Article } from 'src/app/models/common';
import { MyErrorStateMatcher } from 'src/app/utils/error/error.state.matcher';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  isLoadingResults: boolean = false;
  articleId: string;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fetchApiService: FetchApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
    this.articleId = this.route.snapshot.params.id;
    this.getArticle(this.articleId);
  }

  getArticle(id: string) {
    this.fetchApiService.getArticle(id).subscribe((responseData: Article) => {
      this.articleForm.setValue({
        title: responseData.title,
        author: responseData.author,
        description: responseData.description,
        content: responseData.content
      });
    });
  }

  articleDetails(): void {
    this.router.navigate(['/show-article', this.articleId]);
  }

  onSubmit(): void {
    this.isLoadingResults = true;
    this.fetchApiService
      .updateArticle(this.articleId, this.articleForm.value)
      .subscribe(
        (responseData: Article) => {
          this.isLoadingResults = false;
          const articleId = responseData._id;
          this.router.navigate(['/show-article', articleId]);
        },
        err => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
