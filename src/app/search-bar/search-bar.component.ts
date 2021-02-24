import {Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter} from '@angular/core';
import {CovidService} from '../services/covid.service';
import {RouterService} from '../services/router.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  mainSearchDisplay = false;
  countryName = '';
  totalCountriesList = [];
  filteredCountriesList = [];

  @ViewChild('auxiliarySearch') auxiliarySearchBox: ElementRef;

  constructor(private covidService: CovidService, private routerService: RouterService) {
  }

  getCountriesList(event): void {
    this.countryName = event.target.value;
    if (this.countryName !== '') {
      this.filteredCountriesList =
        this.totalCountriesList.filter(country => country.startsWith(this.countryName.toLowerCase().trim()));
    } else {
      this.filteredCountriesList = [];
    }
  }

  shiftToMainSearchDisplay(event: Event): void {
    this.mainSearchDisplay = true;
    this.auxiliarySearchBox.nativeElement.blur();
  }

  switchToAuxiliarySearch(event: Event): void {
    this.mainSearchDisplay = false;
    // this.auxiliarySearchBox.nativeElement.focus();
  }

  displayToInput(country: string): void {
    this.countryName = country;
  }

  extractCountryDetails(): void {
    this.routerService.goToCountryDashboard(this.countryName);
  }

  ngOnInit(): void {
    this.covidService.getCountries().subscribe(data => {
      this.totalCountriesList = data.map(currentData => currentData.Slug).sort();
    }, error => {
      console.log(error);
    });
  }

}
