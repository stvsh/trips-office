import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {

  @Output() startDate = new EventEmitter<string>();
  @Output() endDate = new EventEmitter<string>();

  constructor() { }

  selectedStartDate: string;
  selectedEndDate: string;

  ngOnInit(): void {
  }

  onStartDateChange(startDate: string): void {
    this.selectedStartDate = startDate;
    this.startDate.emit(startDate);
  }

  onEndDateChange(endDate: string): void {
    this.selectedEndDate = endDate;
    this.endDate.emit(endDate);
  }

}
