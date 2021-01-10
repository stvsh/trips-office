import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from '../../models/trip';
import { TripStoreService } from '../../services/trip-store.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnInit {
  @Input() trip?: Trip;

  url = '';
  tripForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private tripStore: TripStoreService
  ) {}

  ngOnInit(): void {
    if (this.trip) {
      this.tripForm = this.fb.group({
        name: [this.trip.name, [Validators.required, Validators.minLength(3)]],
        country: [this.trip.country, [Validators.required]],
        price: [this.trip.price, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
        capacity: [this.trip.capacity, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
        description: [this.trip.description],
        startDate: [formatDate(this.trip.startDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
        endDate: [formatDate(this.trip.endDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
        imageUri: [this.trip.imageUri, Validators.required]
      });
    } else {
      this.tripForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        country: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
        capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
        description: [''],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        imageUri: [null, Validators.required]
      });
    }
  }

  onSelectFile(seletFileEvent): void {
    if (seletFileEvent.target.files && seletFileEvent.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(seletFileEvent.target.files[0]);

      reader.onload = (event) => {
        this.tripForm.patchValue({
          imageUri: event.target.result.toString()
        });
      };
    }
  }

  addTrip(tripForm: FormGroup): void {
    const trip = { ...tripForm.value, availableSeats: tripForm.value.capacity } as Trip;

    if (this.trip) {
      trip.id = this.trip.id;

      this.tripStore.updateTrip(trip);
    } else {
      this.tripStore.addTrip(trip);
    }

    this.modal.close();
  }
}
