import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripMaxPrice'
})
export class MaxPricePipe implements PipeTransform {

  transform(trips: Trip[], maxPrice: number): Trip[] {
    if (!maxPrice) { return trips; }

    return trips.filter(trip => trip.price <= maxPrice);
  }

}
