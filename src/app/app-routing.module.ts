import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'news/reddit-r-all',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'news/:sourceKey',
        component: ArticleListComponent
      }
    ])
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
