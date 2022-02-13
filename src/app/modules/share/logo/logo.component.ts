import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent implements OnInit {
  @Input() height = 30;
  @Input() width = 120;


  constructor() {
  }


  ngOnInit() {
  }

}
