import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticleContainerComponent, ArticleListComponent, ArticlePageComponent} from '../modules/article';
import {FilterEnum} from '../enums';

const routes: Routes = [
  {
    path: '',
    component: ArticleContainerComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent
      },
      {
        path: 'type/:id',
        component: ArticleListComponent,
        data: {
          filter: FilterEnum.type
        }
      },
      {
        path: 'type/:id/page/:current_page',
        component: ArticleListComponent,
        data: {
          filter: FilterEnum.type
        }
      },
      {
        path: 'author/:id',
        component: ArticleListComponent,
        data: {
          filter: FilterEnum.author
        }
      },
      {
        path: 'author/:id/page/:current_page',
        component: ArticleListComponent,
        data: {
          filter: FilterEnum.author
        }
      },
      {
        path: ':uuid',
        component: ArticlePageComponent
      },
      {
        path: '',
        redirectTo: ''
      },
      {
        path: '**',
        redirectTo: 'page/not-found'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRouting {
}
