import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleInterface, ArticlesResponseInterface, AuthorInterface, TypeInterface} from '../../../interfaces';
import {Subscription} from 'rxjs';
import {ActionEnum, FilterEnum} from '../../../enums';
import {HttpService} from '../../../services';

@Component({
  selector: 'app-articles-by',
  templateUrl: './articles-by.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ArticlesByComponent implements OnInit, OnDestroy {
  // The search criteria
  @Input() source: TypeInterface | AuthorInterface | undefined;

  // The type of search criteria
  @Input() filter: FilterEnum | undefined;

  // The limit of the articles
  @Input() limit = 7;

  // The list of articles
  articles: Array<ArticleInterface> = [];

  // The loading of the page
  isBusy = false;

  filterEnum: typeof FilterEnum = FilterEnum;

  // The list of subscriptions
  private subscriptions: Subscription[] = [];


  constructor(private httpService: HttpService) {
  }


  ngOnInit() {
    this.isBusy = true;
    const articles$ = this.httpService.doAction(`articles?page=1&size=${this.limit}&${this.filter}=${this.source?.id}`, ActionEnum.view).subscribe({
      next: (articles: ArticlesResponseInterface) => {
        this.articles = articles && articles.data ? articles.data : [];
        this.isBusy = false;
      },
      error: () => {
        this.articles = [];
        this.isBusy = false;
      }
    });
    this.subscriptions.push(articles$);
  }


  ngOnDestroy() {
    if (this.subscriptions.length !== 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }


  get link(): string {
    let link = '/articles';

    if (this.filter === this.filterEnum.type) {
      link = link + '/type';
    }
    if (this.filter === this.filterEnum.author) {
      link = link + '/author';
    }

    return link;
  }
}
