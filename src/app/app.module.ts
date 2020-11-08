import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { TripComponent } from './components/trip/trip.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { CartComponent } from './components/cart/cart.component';
import { BookedTripsComponent } from './components/booked-trips/booked-trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { ReviewComponent } from './components/review/review.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { FiltersComponent } from './components/filters/filters.component';
import { StarFilterComponent } from './components/filters/star-filter/star-filter.component';
import { StarsPipe } from './pipes/stars.pipe';
import { PriceFilterComponent } from './components/filters/price-filter/price-filter.component';
import { MinPricePipe } from './pipes/min-price.pipe';
import { MaxPricePipe } from './pipes/max-price.pipe';
import { DateFilterComponent } from './components/filters/date-filter/date-filter.component';
import { StartDatePipe } from './pipes/start-date.pipe';
import { EndDatePipe } from './pipes/end-date.pipe';
import { CountryFilterComponent } from './components/filters/country-filter/country-filter.component';
import { CountryPipe } from './pipes/country.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsListComponent,
    TripComponent,
    TripFormComponent,
    CartComponent,
    BookedTripsComponent,
    TripDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    ReviewComponent,
    ReviewsListComponent,
    FiltersComponent,
    StarFilterComponent,
    StarsPipe,
    PriceFilterComponent,
    MinPricePipe,
    MaxPricePipe,
    DateFilterComponent,
    StartDatePipe,
    EndDatePipe,
    CountryFilterComponent,
    CountryPipe,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/trips', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { 
        path: 'trips',
        component: TripsListComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'trips/:id',
        component: TripDetailsComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AuthGuard, AdminGuard]
      }
    ]),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
