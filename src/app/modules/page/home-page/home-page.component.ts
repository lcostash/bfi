import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from '../../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [HttpService]
})
export class HomePageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];


  constructor(private httpService: HttpService) {
  }


  ngOnInit() {

  }


  ngOnDestroy() {
    if (this.subscriptions.length !== 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

}
