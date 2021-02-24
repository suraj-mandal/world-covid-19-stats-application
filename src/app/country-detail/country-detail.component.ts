import {Component, OnInit} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {CovidService} from '../services/covid.service';
import {RouterService} from '../services/router.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  currentCountry: string;

  chartReady = false;

  liveActiveCount: number | string;
  liveConfirmedCount: number | string;
  liveRecoveryCount: number | string;
  liveDeathCount: number | string;

  datapoints = ['Confirmed', 'Recovered', 'Active', 'Deaths'];
  datapointLabels = ['Confirmed cases curve', 'Recovered cases curve', 'Active cases curve', 'Deaths curve'];
  finalChartData = [];
  dateLabels: Label[];

  lineChartOptions = {
    responsive: true,
    bezierCurve: true,
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2
      },
      point: {
        radius: 1
      }
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private covidService: CovidService, private routerService: RouterService) {
  }

  closeScreen(): void {
    this.routerService.goToMain();
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.currentCountry = history.state.data;
      console.log(this.currentCountry);
    } else {
      this.currentCountry = 'India';
    }
    this.covidService.getCoronaCountryWiseData(this.currentCountry).subscribe(data => {
      console.log(data.length);
      this.liveActiveCount = this.processLiveData(data[data.length - 1].Active);
      this.liveDeathCount = this.processLiveData(data[data.length - 1].Deaths);
      this.liveConfirmedCount = this.processLiveData(data[data.length - 1].Confirmed);
      this.liveRecoveryCount = this.processLiveData(data[data.length - 1].Recovered);
      this.dateLabels = data.map(currentData => new Date(currentData.Date).toLocaleDateString());
      this.datapoints.forEach((currentDataPoint, idx) => {
        this.finalChartData.push({
          lineChartData: [{
            data: data.map(currentData => currentData[currentDataPoint]),
            label: this.datapointLabels[idx]
          }]
        });
      });
      this.currentCountry = data[0].Country;
      this.chartReady = true;
      // console.log(this.lineChartData);
      // console.log(this.dateLabels);
    }, error => {
      console.log(error);
    });
  }

  processLiveData(inputData: number): string | number {
    const breakPoints = [{bound: 1000000000, value: 'B'}, {bound: 1000000, value: 'M'}, {bound: 1000, value: 'K'}];
    let flag = false;
    for (const currentBreakPoint of breakPoints) {
      if (inputData >= currentBreakPoint.bound) {
        console.log();
        flag = true;
        console.log(flag);
        return (inputData / currentBreakPoint.bound).toFixed(2) + currentBreakPoint.value;
      }
    }
    if (!flag) {
      return inputData;
    }
  }

}
