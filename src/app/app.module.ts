import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AppRouting} from './routings';
import {InitAppHelper} from './helpers';
import {HttpService} from './services';
import {ErrorInterceptor} from './interceptors';

const initAppFactory = (initAppHelper: InitAppHelper): any => (): Promise<any> => initAppHelper.load();

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpService,
    InitAppHelper,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initAppFactory, multi: true, deps: [InitAppHelper]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
