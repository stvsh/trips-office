import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripCountry'
})
export class CountryPipe implements PipeTransform {

  transform(trips: Trip[], countries: string[]): unknown {
    if (!countries || countries.length === 0) return trips;

    return trips.filter(trip => countries.includes(trip.country));
  }
}
