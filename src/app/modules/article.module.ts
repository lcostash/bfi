import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ArticleRouting} from '../routings';
import {ShareModule} from './share.module';
import {ArticleContainerComponent, ArticleListComponent, ArticlePageComponent} from './article';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ArticleRouting,
    ShareModule
  ],
  declarations: [
    ArticleContainerComponent,
    ArticleListComponent,
    ArticlePageComponent
  ],
  providers: []
})
export class ArticleModule {
}
