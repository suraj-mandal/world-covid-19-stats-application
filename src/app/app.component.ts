import {Component, OnInit} from '@angular/core';
import {CovidService} from './services/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covid19Application';
  worldDetails: {};

  constructor(private covidService: CovidService) {
  }

  ngOnInit(): void {
    this.covidService.getWorldTotalDetails().subscribe(data => {
      console.log(data);
      this.worldDetails = data;
    }, error => {
      console.log(error);
    });
  }
}
