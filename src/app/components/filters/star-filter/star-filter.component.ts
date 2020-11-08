import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-filter',
  templateUrl: './star-filter.component.html',
  styleUrls: ['./star-filter.component.css']
})
export class StarFilterComponent implements OnInit {

  @Output() ratings = new EventEmitter<number[]>();

  _ratings: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onRatingsChange(rating: number, isSelected: boolean): void {
    if (isSelected) {
      this._ratings = [ ...this._ratings, rating ];
    } else {
      this._ratings = this._ratings.filter(val => val !== rating);
    }

    this.ratings.emit(this._ratings);
  }
}
