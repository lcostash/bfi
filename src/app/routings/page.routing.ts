import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent, PageNotFoundComponent, PageContainerComponent} from '../modules/page';

const routes: Routes = [
  {
    path: '',
    component: PageContainerComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'not-found',
        component: PageNotFoundComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRouting {
}
