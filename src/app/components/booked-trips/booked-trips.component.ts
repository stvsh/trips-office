import { Component } from '@angular/core';
import { BookingStoreService } from '../../services/booking-store.service';

@Component({
  selector: 'app-booked-trips',
  templateUrl: './booked-trips.component.html',
  styleUrls: ['./booked-trips.component.css']
})
export class BookedTripsComponent {
  get bookedTripsCount(): number {
    let count: number;

    this.bokingStore.bookings.subscribe(bookings => count = bookings.valueSeq().reduce((sum, count) => sum + count, 0));

    return count;
  }

  get bookedTripsValue(): number {
    let value: number = 0;

    this.bokingStore.bookings.subscribe(bookings => value = bookings.entrySeq().reduce((sum, [trip, count]) => sum + count * trip.price, 0));

    return value;
  }

  constructor(public bokingStore: BookingStoreService) {

  }
}
