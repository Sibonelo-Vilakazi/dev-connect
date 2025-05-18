import { Injectable, inject } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../models/user.model';

import { Router } from '@angular/router';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = this.firebaseService.getCurrentUser();
  userService: UserService = inject(UserService);
  USER = 'USER';
  
  authReadyResolver!: () => void;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  authReady = new Promise<void>((resolve) => this.authReadyResolver = resolve);

  signInWithGoogle(): Observable<User> {
    return new Observable((subscriber) => {
      this.firebaseService.signInWithGoogle()
        .then((user: User) => {
        
          this.completeUser(user, subscriber);
          
          
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }
  
  signOut(): void {
    this.firebaseService.signOut()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }
  
  isAuthenticated(): boolean {
    let isAuth = true;
    
    this.currentUser$.subscribe(user => {
      isAuth = !!user;
    });

   
    return isAuth;
  }


  completeUser(user: User, subscriber: any){
    this.userService.getUserById(user.id).subscribe({
      next: (res) =>{
       
        if(res !== undefined){
          
          this.setUserFromDatabase(res);
        
          subscriber.next(res);
          subscriber.complete();
        } else {
          this.userService.createUser(user).then((res) =>{
              this.setUserFromDatabase(user);
              subscriber.next(user);
              subscriber.complete();
            }
          );
        }
      },
      error: (err) => {
        console.error('failed to get the user');
      } 
    });
  }
  
  getCurrentUser(): User | null {
    let currentUser: User | null = null;
    this.currentUser$.subscribe(user => {
      currentUser = user;
    });
    return currentUser;
  }


  setUserFromDatabase(user: User){
    localStorage.setItem(this.USER, JSON.stringify(user))
  }

  getUserFromDatabase(): User{
    return JSON.parse(localStorage.getItem(this.USER) ?? '{}') as User;
  }
}