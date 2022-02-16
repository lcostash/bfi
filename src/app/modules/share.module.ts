import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ArticleComponent, ArticlesByComponent, FooterComponent, HeaderComponent, LogoComponent} from './share';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  declarations: [
    ArticleComponent,
    ArticlesByComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent
  ],
  exports: [
    ArticleComponent,
    ArticlesByComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent
  ]
})
export class ShareModule {
}
