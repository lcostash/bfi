import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from '../../../services';
import {Subscription} from 'rxjs';
import {AuthorsResponseInterface, TypesResponseInterface} from '../../../interfaces';
import {FilterEnum} from '../../../enums';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [HttpService]
})
export class HomePageComponent implements OnInit, OnDestroy {
  // The list of the types
  types: TypesResponseInterface | undefined;

  // The list of authors
  authors: AuthorsResponseInterface | undefined;

  // The filter type
  filterEnum: typeof FilterEnum = FilterEnum;

  // The list of subscriptions
  private subscriptions: Subscription[] = [];


  constructor() {
  }


  ngOnInit() {
    // Subscribe to the replay subject which kept the types from back-end
    const types$ = HttpService.types$.subscribe({
      next: result => this.types = result as TypesResponseInterface,
      error: () => this.types = undefined
    });
    this.subscriptions.push(types$);

    // Subscribe to the replay subject which kept the authors from back-end
    const authors$ = HttpService.types$.subscribe({
      next: result => this.types = result as AuthorsResponseInterface,
      error: () => this.types = undefined
    });
    this.subscriptions.push(authors$);
  }


  ngOnDestroy() {
    if (this.subscriptions.length !== 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

}
