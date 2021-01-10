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

  onRatingFilter(ratings: number[]): void {
    this.ratings.emit(ratings);
  }

  onMinPriceFilter(minPrice: number): void {
    this.minPrice.emit(minPrice);
  }

  onMaxPriceFilter(maxPrice: number): void {
    this.maxPrice.emit(maxPrice);
  }

  onStartDateFilter(startDate: string): void {
    this.startDate.emit(startDate);
  }

  onEndDateFilter(endDate: string): void {
    this.endDate.emit(endDate);
  }

  onCountryFilter(countries: string[]): void {
    this.countries.emit(countries);
  }
}
