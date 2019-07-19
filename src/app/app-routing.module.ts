import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ShowArticleComponent } from './pages/show-article/show-article.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { ArticleResolver } from './utils/resolvers/article.resolver';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
    data: { title: 'Articles' }
  },
  {
    path: 'show-article/:id',
    component: ShowArticleComponent,
    data: { title: 'Show Article' },
    resolve: { article: ArticleResolver}
  },
  {
    path: 'add-article',
    component: AddArticleComponent,
    data: { title: 'Add Article' }
  },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
    data: { title: 'Edit Article' }
  },
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
