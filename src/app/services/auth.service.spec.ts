import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

const AngularFireAuthMock = jasmine
  .createSpy('signInWithEmailAndPassword')
  .and.returnValue(Promise.resolve({ uid: 'test-user' }));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be not authenticated by default', () => {
    return service.authState$.subscribe(user => {
        expect(user).toBeNull();
    });
  });
});
