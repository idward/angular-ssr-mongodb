import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiService } from 'src/app/api/fetch-api.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Article } from 'src/app/models/common';
import { MyErrorStateMatcher } from 'src/app/utils/error/error.state.matcher';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  isLoadingResults: boolean = false;
  articleForm: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
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
  }

  onSubmit(): void {
    this.isLoadingResults = true;
    this.fetchApiService.createArticle(this.articleForm.value).subscribe(
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
