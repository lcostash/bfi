import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleInterface} from '../../../interfaces';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {
  // The article
  @Input() article: ArticleInterface | undefined;

  // The css class
  @Input() css: string = '';


  constructor() {
  }


  ngOnInit() {
  }
}
