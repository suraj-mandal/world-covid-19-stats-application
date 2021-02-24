import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private httpClient: HttpClient) {
  }


  getWorldTotalDetails(): Observable<any> {
    return this.httpClient.get<any>('https://api.covid19api.com/world/total');
  }

  getCountries(): Observable<any> {
    return this.httpClient.get<any>('https://api.covid19api.com/countries');
  }

  getCoronaCountryWiseData(country: string): Observable<any> {
    return this.httpClient.get<any>(`https://api.covid19api.com/total/country/${country}`);
  }
}
