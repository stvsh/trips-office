import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TripFormComponent } from '../trip-form/trip-form.component';
import { TripStoreService } from '../../services/trip-store.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit {
  trips: Trip[] = [];

  ratings: number[];
  minPrice: number;
  maxPrice: number;
  startDate: string;
  endDate: string;
  countries: string[];

  constructor(public tripStore: TripStoreService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.tripStore.trips.subscribe(trips => this.trips = trips);
  }

  onDelete(trip: Trip): void {
    this.tripStore.deleteTrip(trip);
  }

  open(): void {
    this.modalService.open(TripFormComponent);
  }

  onRatingFilter(ratings: number[]): void {
    this.ratings = ratings;
  }

  onMinPriceFilter(minPrice: number): void {
    this.minPrice = minPrice;
  }

  onMaxPriceFilter(maxPrice: number): void {
    this.maxPrice = maxPrice;
  }

  onStartDateFilter(startDate: string): void {
    this.startDate = startDate;
  }

  onEndDateFilter(endDate: string): void {
    this.endDate = endDate;
  }

  onCountryFilter(countries: string[]): void {
    this.countries = countries;
  }
}
