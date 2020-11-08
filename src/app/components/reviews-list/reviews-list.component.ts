import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { CartService, Order } from 'src/app/services/cart.service';
import { Review, ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit {

  @Input() trip: Trip;
  @Input() currentUser: User;
  @Input() tripReviews: Review[] = [];
  
  userOrders: Order[] = []

  constructor(
    private reviewsService: ReviewsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.reviewsService.getTripReviews(this.trip).subscribe(reviews => {
      this.tripReviews = reviews;
      this.sortReviewsByCreationDate();      
    });
    this.cartService.getUserOrders(this.currentUser).subscribe(orders => this.userOrders = orders);
  }

  private sortReviewsByCreationDate(): void {
    this.tripReviews.sort((r1, r2) => {
      if (r1.createdAt < r2.createdAt) {
        return -1;
      } else if (r1.createdAt > r2.createdAt) {
        return 1;
      } 
      
      return 0;
    });
  }
}
