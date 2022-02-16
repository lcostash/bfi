import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
  ArticleInterface,
  ArticlesResponseInterface, AuthorInterface,
  AuthorsResponseInterface,
  MetaInterface, TypeInterface,
  TypesResponseInterface
} from '../../../interfaces';
import {Subscription} from 'rxjs';
import {ActionEnum, FilterEnum} from '../../../enums';
import {HttpService} from '../../../services';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ArticleListComponent implements OnInit, OnDestroy {
  // The loading of the page
  isBusy = false;

  // The list of articles
  articles: Array<ArticleInterface> = [];

  // The meta which store the data belongs to pagination
  meta: MetaInterface | undefined;

  // The list of the types
  private types: TypesResponseInterface | undefined;

  // The list of authors
  private authors: AuthorsResponseInterface | undefined;

  // The id of author or of the article type
  private id: string = '';

  // The id of author or of the article type
  private current_page: number = 1;

  // The type of search criteria
  private filter: FilterEnum | undefined;

  // The filter enums
  private filterEnum: typeof FilterEnum = FilterEnum;

  // The list of subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Get the params from the route
    const params$ = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] ? params['id'] : '';
      this.current_page = params['current_page'] ? params['current_page'] : 1;
    });
    this.subscriptions.push(params$);

    // Get the data from the route
    const data$ = this.activatedRoute.data.subscribe(data => {
      this.filter = data['filter'] ? data['filter'] : undefined;
    });
    this.subscriptions.push(data$);

    const route$ = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url)
    ).subscribe((url: string) => {
      this.getArticles();
    });
    this.subscriptions.push(route$);

    // Subscribe to the replay subject which kept the types from back-end
    const types$ = HttpService.types$.subscribe({
      next: result => this.types = result as TypesResponseInterface,
      error: () => this.types = undefined
    });
    this.subscriptions.push(types$);

    // Subscribe to the replay subject which kept the authors from back-end
    const authors$ = HttpService.authors$.subscribe({
      next: result => this.authors = result as AuthorsResponseInterface,
      error: () => this.authors = undefined
    });
    this.subscriptions.push(authors$);
  }


  ngOnInit() {
  }


  ngOnDestroy() {
    if (this.subscriptions.length !== 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  // Display the section title: Can be an Author or Article Type
  public get title(): string {
    let title = '';

    if (this.filter === this.filterEnum.type) {
      const data = this.types && this.types?.data ? this.types?.data : [];
      const titles = data.filter((type: TypeInterface) => type.id === this.id).map((type: TypeInterface) => type.name);
      title = titles.length !== 0 ? titles[0] : '';
    }
    if (this.filter === this.filterEnum.author) {
      const data = this.authors && this.authors?.data ? this.authors?.data : [];
      const titles = data.filter((author: AuthorInterface) => author.id === this.id).map((author: AuthorInterface) => author.name);
      title = titles.length !== 0 ? titles[0] : '';
    }

    return title;
  }


  private getArticles(): void {
    this.isBusy = true;
    const articles$ = this.httpService.doAction(this.link, ActionEnum.view).subscribe({
      next: (articles: ArticlesResponseInterface) => {
        this.articles = articles && articles.data ? articles.data : [];
        this.meta = articles && articles.meta ? articles.meta : {total: 0};
        this.isBusy = false;
      },
      error: () => {
        this.articles = [];
        this.meta = undefined;
        this.isBusy = false;
      }
    });
    this.subscriptions.push(articles$);
  }


  public get link(): string {
    let link = 'articles?size=28&page=' + this.current_page;

    if (this.filter === this.filterEnum.type) {
      link = link + '&type=';
    }
    if (this.filter === this.filterEnum.author) {
      link = link + '&author=';
    }

    return link + this.id;
  }


  public get previousPage(): string {
    let page = this.currentPage;
    if (page > 1) {
      page--;
    }

    return `/articles/${this.filter}/${this.id}/page/${page}`;
  }


  public get nextPage(): string {
    let page = this.currentPage;
    const last_page = this.lastPage;
    if (page < last_page) {
      page++;
    }

    return `/articles/${this.filter}/${this.id}/page/${page}`;
  }


  public get currentPage(): number {
    return parseInt(this.meta?.current_page ?? '1', 0);
  }


  public get lastPage(): number {
    return this.meta?.last_page ?? 1;
  }

}
