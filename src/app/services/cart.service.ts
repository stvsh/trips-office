import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Booking } from '../models/booking';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import firebase from 'firebase/app';

export interface Cart {
  bookings: Booking[],
  value: number
}

export interface Order {
  tripId: string,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private afs: AngularFirestore) {
  }

  getBoookings(): Observable<Cart[]> {
    return this.afs.collection<Cart>('cart').valueChanges();
  }

  getTripBookings(trip: Trip): Observable<Booking[]> {
    return this.afs.collectionGroup<Booking>('bookings').valueChanges({ idField: 'tripId' })
      .pipe(map(bookings => bookings.filter(booking => booking.tripId === trip.id)));
  }

  getUserBookings(user: User): Observable<Booking[]> {
    const userId = user.id;

    return this.afs.collection<Booking>(`carts/${userId}/bookings`).valueChanges({ idField: 'tripId' });
  }

  getUserOrders(user: User): Observable<Order[]> {
    const userId: string = user.id;

    return this.afs.collection<Order>(`carts/${userId}/orders`).valueChanges({ idField: 'tripId' });
  }

  addBooking(user: User, booking: Booking): void {
    this.afs.collection<Cart>('carts').doc(user.id).collection<Booking>('bookings').doc(booking.tripId).set({ quantity: booking.quantity })
  }

  purchaseTrips(user: User, bookings: Booking[]): void {
    const userId: string = user.id;
    const newOrderId: string = this.afs.createId();

    for (const booking of bookings) {
      this.afs.doc(`carts/${userId}/orders/${booking.tripId}`).set({ quantity: booking.quantity });
      this.afs.doc(`carts/${userId}/bookings/${booking.tripId}`).delete();
      this.afs.doc(`trips/${booking.tripId}`).update({ availableSeats: firebase.firestore.FieldValue.increment(-booking.quantity) });
    }

    this.afs.doc(`carts/${userId}`).collection('bookings')
  }
}
