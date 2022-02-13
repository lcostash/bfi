import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PageRouting} from '../routings';
import {ShareModule} from './share.module';
import {HomePageComponent, PageContainerComponent, PageNotFoundComponent} from './page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PageRouting,
    ShareModule
  ],
  declarations: [
    HomePageComponent,
    PageContainerComponent,
    PageNotFoundComponent
  ],
  providers: []
})
export class PageModule {
}
