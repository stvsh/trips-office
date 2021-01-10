import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-filter',
  templateUrl: './star-filter.component.html',
  styleUrls: ['./star-filter.component.css']
})
export class StarFilterComponent implements OnInit {

  @Output() ratings = new EventEmitter<number[]>();

  selectedRatings: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onRatingsChange(rating: number, isSelected: boolean): void {
    if (isSelected) {
      this.selectedRatings = [ ...this.selectedRatings, rating ];
    } else {
      this.selectedRatings = this.selectedRatings.filter(val => val !== rating);
    }

    this.ratings.emit(this.selectedRatings);
  }
}
