import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
  
  signInWithGoogle(): Observable<User> {
    return new Observable((subscriber) => {
      this.firebaseService.signInWithGoogle()
        .then((user: User) => {
          
          this.completeUser(user);
          subscriber.next(user);
          subscriber.complete();
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
    let isAuth = false;
    this.currentUser$.subscribe(user => {
      isAuth = !!user;
    });
    return isAuth;
  }


  completeUser(user: User){
    this.userService.getUserById(user.id).subscribe({
      next: (res) =>{
       
        if(!res == undefined){
          
          this.setUserFromDatabase(res);
        } else {
          this.userService.createUser(user).then((res) =>{
              this.setUserFromDatabase(user);
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