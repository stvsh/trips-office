import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent implements OnInit {

  @Output() minPrice = new EventEmitter<number>();
  @Output() maxPrice = new EventEmitter<number>();

  message: string;

  constructor() { }

  ngOnInit(): void {
  }

  onMinPriceChange(minPrice: number) {
    this.minPrice.emit(minPrice);
  }

  onMaxPriceChange(maxPrice: number) {
    this.maxPrice.emit(maxPrice);
  }
}
