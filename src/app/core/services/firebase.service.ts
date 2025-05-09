import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { doc, setDoc } from '@angular/fire/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAn97r4fgtRGuXEAIZKRIDZBLbXh6m2ia4",
  authDomain: "dev-connect-d4773.firebaseapp.com",
  projectId: "dev-connect-d4773",
  storageBucket: "dev-connect-d4773.firebasestorage.app",
  messagingSenderId: "1039977509601",
  appId: "1:1039977509601:web:c580af0aa44f2c6aab3da0",
  measurementId: "G-ZLK33QB7NB"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private analytics = getAnalytics(this.app);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  constructor() {
    onAuthStateChanged(this.auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = this.mapFirebaseUserToUser(firebaseUser);
        this.currentUserSubject.next(user);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }


  
  
  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
  
  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);

    
    const user = this.mapFirebaseUserToUser(result.user);
    this.currentUserSubject.next(user);
    return user;
  }
  
  async signOut(): Promise<void> {
    await signOut(this.auth);
    this.currentUserSubject.next(null);
  }
  
  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      username: firebaseUser.email?.split('@')[0] || '',
      bio: '',
      certifications: [],
      projects: []
    };
  }
}