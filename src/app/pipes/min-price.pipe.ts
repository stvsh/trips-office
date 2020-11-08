import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripMinPrice'
})
export class MinPricePipe implements PipeTransform {

  transform(trips: Trip[], minPrice: number): Trip[] {
    if (!minPrice) return trips;

    return trips.filter(trip => trip.price >= minPrice);
  }
}
