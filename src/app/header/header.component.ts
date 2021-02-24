import {Component, OnInit} from '@angular/core';
import {CovidService} from '../services/covid.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  worldDetails: {};

  constructor(private covidService: CovidService) {
  }

  ngOnInit(): void {
    this.covidService.getWorldTotalDetails().subscribe(data => {
      console.log(data);
      this.worldDetails = data;
    }, err => {
      console.log(err);
    });
  }

}
