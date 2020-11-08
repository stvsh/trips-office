import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TripStoreService } from 'src/app/services/trip-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: User;
  trips: Trip[];
  bookings: Booking[] = [];

  get anyBookings(): boolean {
    return this.bookings.length > 0;
  }

  get bookingsSum(): number {
    return this.bookings.reduce((sum, booking) => sum + booking.quantity * this.tripInfo(booking.tripId).price, 0);
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private tripsService: TripStoreService 
  ) { 
  }
  
  ngOnInit(): void {
    this.authService.authState$.subscribe(user => {
      this.user = user;

      this.cartService.getUserBookings(user).subscribe(bookings => {
        this.bookings = bookings;
      });
    });

    this.tripsService.trips.subscribe(trips => {
      this.trips = trips
    });
  }

  tripInfo(tripId: string): Trip {
    return this.trips.find(trip => trip.id === tripId);
  }

  buy() {
    this.cartService.purchaseTrips(this.user, this.bookings);
  }
}
