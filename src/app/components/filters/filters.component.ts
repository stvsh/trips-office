import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output() ratings = new EventEmitter<number[]>();
  @Output() minPrice = new EventEmitter<number>();
  @Output() maxPrice = new EventEmitter<number>();
  @Output() startDate = new EventEmitter<string>();
  @Output() endDate = new EventEmitter<string>();
  @Output() countries = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onRatingFilter(ratings: number[]) {
    this.ratings.emit(ratings);
  }

  onMinPriceFilter(minPrice: number) {
    this.minPrice.emit(minPrice);
  }

  onMaxPriceFilter(maxPrice: number) {
    this.maxPrice.emit(maxPrice);
  }

  onStartDateFilter(startDate: string) {
    this.startDate.emit(startDate);
  }

  onEndDateFilter(endDate: string) {
    this.endDate.emit(endDate);
  }

  onCountryFilter(countries: string[]) {
    this.countries.emit(countries);
  }
}
