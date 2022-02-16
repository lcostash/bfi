import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreloadingHelper} from '../helpers';

const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () => import('../modules/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'page',
    loadChildren: () => import('../modules/page.module').then(m => m.PageModule)
  },
  {
    path: '',
    redirectTo: 'page/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    preloadingStrategy: PreloadingHelper
  })],
  exports: [RouterModule],
  providers: [PreloadingHelper]
})
export class AppRouting {
}
