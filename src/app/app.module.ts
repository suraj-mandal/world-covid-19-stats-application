import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {FormsModule} from '@angular/forms';
import {CovidService} from './services/covid.service';
import {RouterService} from './services/router.service';
import {RouterModule, Routes} from '@angular/router';
import {CountryDetailComponent} from './country-detail/country-detail.component';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [{
  component: HeaderComponent,
  path: ''
}, {
  component: CountryDetailComponent,
  path: 'country'
}];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    CountryDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CovidService, RouterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
