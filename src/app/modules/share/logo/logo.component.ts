import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent implements OnInit {
  // The height of the logo
  @Input() height = 40;

  // The width of the logo
  @Input() width = 40;

  // Extend the css classes
  @Input() css = '';

  constructor() {
  }

  ngOnInit() {
  }

}
