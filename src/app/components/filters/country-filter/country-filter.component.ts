import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TripStoreService } from 'src/app/services/trip-store.service';

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {

  @Output() countries = new EventEmitter<string[]>();

  allCountries: string[] = [];
  _countries: string[] = [];

  constructor(private tripsService: TripStoreService) { }

  ngOnInit(): void {
    this.tripsService.trips.subscribe(trips => {
      this.allCountries = trips.map(trip => trip.country);
    })
  }

  onCountriesChange(country: string, isSelected: boolean) {
    if (isSelected) {
      this._countries = [ ...this._countries, country ];
    } else {
      this._countries = this._countries.filter(val => val !== country)
    }

    this.countries.emit(this._countries);
  }
}
