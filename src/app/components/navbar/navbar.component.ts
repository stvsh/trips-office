import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  userBookings: Booking[] = []; 

  get bookingsCount(): number {
    return this.userBookings.length;
  }

  get admin(): boolean {
    return this.user.roles.admin;
  }

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.authService.authState$.subscribe(user => {
      this.user = user;
      if (user) {
        this.cartService.getUserBookings(user).subscribe(bookings => {
          this.userBookings = bookings;
        })
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
