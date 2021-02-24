import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) {
  }

  goToCountryDashboard(country: string): void {
    this.router.navigate(['country'], {state: {data: country}});
  }

  goToMain(): void {
    this.router.navigate(['']);
  }
}
