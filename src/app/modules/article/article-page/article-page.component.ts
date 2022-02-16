import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from '../../../services';
import {ArticleInterface} from '../../../interfaces';
import {Subscription} from 'rxjs';
import {ActionEnum, FilterEnum} from '../../../enums';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  // The loading of the page
  isBusy = false;

  // The article
  article: ArticleInterface | undefined;

  // The article uuid
  uuid: string | undefined;

  // The filter type
  filterEnum: typeof FilterEnum = FilterEnum;

  // The list of subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    const params$ = this.activatedRoute.params.subscribe(params => {
      this.uuid = params['uuid'] ? params['uuid'] : undefined;
      this.getArticle();
    });
    this.subscriptions.push(params$);
  }


  ngOnInit() {
  }


  ngOnDestroy() {
    if (this.subscriptions.length !== 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }


  private getArticle(): void {
    this.isBusy = true;
    const article$ = this.httpService.doAction(`articles/${this.uuid}`, ActionEnum.view).subscribe({
      next: (article: ArticleInterface) => {
        this.article = article ? article : undefined;
        this.isBusy = false;
      },
      error: () => {
        this.article = undefined;
        this.isBusy = false;
      }
    });
    this.subscriptions.push(article$);
  }

}
