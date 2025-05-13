import { Injectable, inject } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { User } from '../models/user.model';
import {Firestore, doc, docData, setDoc, updateDoc, collection, where, query, getDocs, getDoc} from '@angular/fire/firestore'
import { AuthService } from './auth.service';
import {load} from '@fingerprintjs/fingerprintjs'
import { arrayUnion } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Mock user data for dev-connectnstration
  private mockUsers: User[] = [];
  private firestore= inject(Firestore);
  constructor() { }
  // Get all users
  async getUsers(): Promise<User[]>{
    const usersRef = collection(this.firestore, 'users');
    const users = await getDocs(usersRef);

    if (users.size === 0) {
      this.mockUsers = [];
      return this.mockUsers;
    }


    this.mockUsers= users.docs.map((doc) => {
      return {...doc.data(), id: doc.id} as User;
    })

    return this.mockUsers;
  }

  // Get user by username
  async getUserByUsername(email: string): Promise<User | null> {
    //const user = this.mockUsers.find(u => u.username === username);
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('username', '==', email));
    const snapshot =  await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }
    const userData = snapshot.docs[0].data() as User;
    userData.id = snapshot.docs[0].id; // Add document ID if needed
    return userData;
  }

  createUser(user: User): Promise<void> {
    const userRef = doc(this.firestore, `users/${user.id}`);
    return setDoc(userRef, user, {merge: true});
  }

   getUserById(id: string): Observable<User> {
    const userRef = doc(this.firestore, `users/${id}`);
    // return docData(userRef, { idField: 'id' }) as Observable<User>

    return from(getDoc(userRef).then(docSnap => {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }));
  }

  // Update user details
  updateUser(userId: string, userData: Partial<User>): Observable<User> {
   
    const userRef = doc(this.firestore, `users/${userId}`);
    setDoc(userRef, userData as User, {merge: true});
    return of(userData as User);
  }


  updateVisitor(userId: string, projectId: string, visitorId: string){
    updateDoc(
      doc(this.firestore, `users/${userId}/projects/${projectId}`),
      {
        visitors: arrayUnion(visitorId)
      }
    );
  }




  // updateUser(id: string, data: Partial<User>): Promise<void> {
    
  // }


  async getVisitorId(): Promise<string> {
    return load().then((res) =>{
      const value= res.get().then((value) =>{
        return value.visitorId;
      }).catch(() =>{
        return '';
      })
      return value;
    }).catch(() => {
      return ''
    })
  }
}