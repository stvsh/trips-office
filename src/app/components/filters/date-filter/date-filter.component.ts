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

  _startDate: string;
  _endDate: string;

  ngOnInit(): void {
  }

  onStartDateChange(startDate: string) {
    this._startDate = startDate;
    this.startDate.emit(startDate);
  }
  
  onEndDateChange(endDate: string) {
    this._endDate = endDate;
    this.endDate.emit(endDate);
  }
  
}
