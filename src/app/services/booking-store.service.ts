import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { Map } from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class BookingStoreService {
  private _bookings: BehaviorSubject<Map<Trip, number>> = new BehaviorSubject(Map<Trip, number>());

  get bookings(): Observable<Map<Trip, number>> {
    return this._bookings.asObservable();
  }

  bookTrip(trip: Trip) {
    const bookings: Map<Trip, number> = this._bookings.getValue();

    const count = bookings.get(trip, 0);

    this._bookings.next(bookings.set(trip, count + 1));
  }

  cancelTrip(trip: Trip) {
    const bookings: Map<Trip, number> = this._bookings.getValue();

    const count = bookings.get(trip, 0);
    if (count > 1) {
      this._bookings.next(bookings.set(trip, count - 1));
    } else {
      this._bookings.next(bookings.delete(trip));
    }
  }

  deleteBookings(trip: Trip) {
    const bookings: Map<Trip, number> = this._bookings.getValue();

    this._bookings.next(bookings.delete(trip));
  }

  clear() {
    this._bookings.next(Map<Trip, number>());
  }
}
