import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripStartDate'
})
export class StartDatePipe implements PipeTransform {

  transform(trips: Trip[], startDate: string): unknown {
    if (!startDate) return trips;

    return trips.filter(trip => new Date(trip.startDate) >= new Date(startDate));
  }

}
