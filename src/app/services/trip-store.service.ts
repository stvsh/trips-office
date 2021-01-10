import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TripStoreService {
  private tripsCollection: AngularFirestoreCollection<Trip>;
  trips: Observable<Trip[]>;

  constructor(private afs: AngularFirestore) {
    this.tripsCollection = afs.collection<Trip>('trips');
    this.trips = this.tripsCollection.valueChanges({ idField: 'id' });
  }

  addTrip(trip: Trip): void {
    delete trip.id;
    this.tripsCollection.add(trip);
  }

  deleteTrip(trip: Trip): void {
    const id: string = trip.id;
    this.tripsCollection.doc(id).delete();
  }

  updateTrip(trip: Trip): void {
    const tripId: string = trip.id;

    this.tripsCollection.doc(tripId).update(trip);
  }
}
