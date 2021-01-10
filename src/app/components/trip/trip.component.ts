import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { Review, ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @Input() trip: Trip;

  tripReviews: Review[] = [];

  constructor(private reviewsService: ReviewsService) {
  }

  get tripRating(): number {
    return this.tripReviews.reduce((sum, review) => sum + review.rating, 0) / this.tripReviews.length;
  }

  ngOnInit(): void {
    this.reviewsService.getTripReviews(this.trip).subscribe(tripReviews => this.tripReviews = tripReviews);
  }
}
