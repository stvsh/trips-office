import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService, Order } from 'src/app/services/cart.service';
import { Review, ReviewsService } from 'src/app/services/reviews.service';
import { TripStoreService } from 'src/app/services/trip-store.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  
  readonly maxRate: number = 10;
  
  trip: Trip;
  currentUser: User;

  quantity: number = 0;

  tripAllBookings: Booking[] = [];
  tripUserBooking: Booking | null = null;
  userOrders: Order[] = []
  tripReviews: Review[] = [];

  reviewRating: number;
  reviewMessage: string;

  get tripEmpty(): boolean {
    return this.quantity === 0;
  }

  get tripFull(): boolean {
    return this.trip.availableSeats - this.quantity === 0;
  }

  get tripAlmostFull(): boolean {
    return this.trip.availableSeats <= 5;
  }

  get tripRating(): number {
    return this.tripReviews.reduce((sum, review) => sum + review.rating, 0) / this.tripReviews.length;
  }

  get hasAnyReviews(): boolean {
    return this.tripReviews.length > 0;
  }

  get userBoughtTrip(): boolean {
    return this.userOrders.findIndex(order => order.tripId === this.trip.id) > -1;
  }

  get userBookedTrip(): boolean {
    return this.tripUserBooking != undefined;
  }

  get userPurchasedTrip(): boolean {
    return this.userOrders.findIndex(order => order.tripId === this.trip.id) > -1;
  }

  get userAddedTripReview(): boolean {
    return this.tripReviews.findIndex(review => review.author === this.currentUser.email) > -1;
  }

  constructor(
    private tripStore: TripStoreService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewsService: ReviewsService,
  ) {}

  ngOnInit(): void {  
    const id: string = this.route.snapshot.paramMap.get('id');

    this.tripStore.trips.subscribe(trips => {
      const selectedTrip = trips.find(t => t.id === id)

      this.trip = selectedTrip;
      
      this.reviewsService.getTripReviews(selectedTrip).subscribe(tripReviews => this.tripReviews = tripReviews);
      this.cartService.getTripBookings(selectedTrip).subscribe(tripBookings => this.tripAllBookings = tripBookings);

      this.authService.authState$.subscribe(user => {
        this.currentUser = user
        this.cartService.getUserBookings(user).subscribe(userBookings => {
          const userBooking = userBookings.find(booking => booking.tripId === selectedTrip.id);
          
          this.tripUserBooking = userBooking;
          
          if (userBooking) {
            this.quantity = userBooking.quantity; 
          }
        });

        this.cartService.getUserOrders(user).subscribe(orders => {
          console.log(orders);
          this.userOrders = orders;
        })
      });
    });
  }

  addBooking(): void {
    const booking = { tripId: this.trip.id, quantity: this.quantity } as Booking;

    this.cartService.addBooking(this.currentUser, booking);
    this.quantity = 0;
  }

  addReview(): void {
    const review: Review = { 
      author: this.currentUser.email,
      message: this.reviewMessage,
      rating: this.reviewRating,
      tripId: this.trip.id
    } as Review;

    this.reviewsService.addReview(this.trip, review);
  }

  plus() {
    this.quantity++;
  }

  minus() {
    this.quantity--;
  }
}
