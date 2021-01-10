import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User>;

  constructor(
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.authState$ = fireAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.collection<User>('users').doc(user.uid).valueChanges({ idField: 'id' });
      } else {
        return of(null);
      }
    }));
  }

  login({email, password}: Credentials): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register({email, password}: Credentials): Promise<void> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(created => {
      this.afs.collection<User>('users').doc(created.user.uid).set({
        email: created.user.email,
        roles: { admin: false }
      });
    });
  }

  logout(): Promise<void> {
    return this.fireAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
