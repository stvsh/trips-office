import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripEndDate'
})
export class EndDatePipe implements PipeTransform {

  transform(trips: Trip[], endDate: string): unknown {
    if (!endDate) { return trips; }

    console.log(endDate);

    return trips.filter(trip => new Date(trip.endDate) <= new Date(endDate));
  }

}
