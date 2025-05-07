import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor() {
    // Check for stored user data on initialization
    this.loadUserFromStorage();
  }
  
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }
  
  // Mock of Google sign-in
  // This would be implemented with Firebase Auth in production
  signInWithGoogle(): Observable<User> {
    // Mock user data
    const mockUser: User = {
      id: '123456',
      email: 'johndoe@example.com',
      displayName: 'John Doe',
      photoURL: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'Full-stack developer passionate about creating meaningful applications',
      certifications: ['AWS Certified Developer', 'Google Cloud Engineer'],
      username: 'johndoe',
      projects: [
        {
          id: '1',
          title: 'E-commerce Platform',
          description: 'A full-featured e-commerce platform with React and Node.js',
          link: 'https://github.com/johndoe/ecommerce'
        },
        {
          id: '2',
          title: 'Task Management App',
          description: 'A productivity app for managing tasks and projects',
          link: 'https://github.com/johndoe/taskmanager'
        }
      ]
    };
    
    // Store the user in local storage
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    
    return of(mockUser);
  }
  
  signOut(): void {
    // Clear stored user data
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}