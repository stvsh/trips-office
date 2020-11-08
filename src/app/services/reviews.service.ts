import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { Trip } from '../models/trip';

export interface Review {
  author: string,
  message: string,
  rating: number,
  tripId: string
  createdAt?: firebase.firestore.Timestamp,
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private afs: AngularFirestore) {
  }

  getAllReviews(): Observable<Review[]> {
    return this.afs.collection<Review>('reviews').valueChanges();
  }

  getTripReviews(trip: Trip): Observable<Review[]> {
    const tripId = trip.id;

    return this.afs.collection<Review>('reviews', ref => ref.where('tripId', '==', tripId)).valueChanges();
  }

  addReview(trip: Trip, review: Review): void {
    this.afs.collection('reviews').add({ ...review, createdAt: firebase.firestore.Timestamp.now() });
  }
}
