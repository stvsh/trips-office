import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';
import { Review, ReviewsService } from '../services/reviews.service';

@Pipe({
  name: 'tripRatings',
})
export class StarsPipe implements PipeTransform {
  reviews: Review[];

  constructor(private reviewsService: ReviewsService) {
    reviewsService
      .getAllReviews()
      .subscribe((reviews) => (this.reviews = reviews));
  }

  transform(trips: Trip[], ratings: number[]): unknown {
    if (!ratings || ratings.length === 0) {
      return trips;
    }

    return trips.filter((trip) => {
      const tripReviews = this.reviews.filter(
        (review) => review.tripId === trip.id
      );
      const tripRating: number =
        tripReviews.length === 0
          ? 0
          : tripReviews.reduce((sum, review) => sum + review.rating, 0) /
            tripReviews.length;

      return ratings.includes(tripRating);
    });
  }
}
