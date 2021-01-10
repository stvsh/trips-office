import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { TripStoreService } from 'src/app/services/trip-store.service';
import { TripFormComponent } from '../trip-form/trip-form.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  trips$: Observable<Trip[]>;

  constructor(
    private tripStore: TripStoreService,
    private modalService: NgbModal
  ) {
    this.trips$ = tripStore.trips;
  }

  open(): void {
    this.modalService.open(TripFormComponent);
  }

  deleteTrip(trip: Trip): void {
    this.tripStore.deleteTrip(trip);
  }

  editTrip(trip: Trip): void {
    const modalRef = this.modalService.open(TripFormComponent);
    modalRef.componentInstance.trip = trip;
  }
}
