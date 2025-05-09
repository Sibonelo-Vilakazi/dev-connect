import { Injectable, inject } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { User } from '../models/user.model';
import {Firestore, doc, docData, setDoc, updateDoc, collection, where, query, getDocs, getDoc} from '@angular/fire/firestore'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Mock user data for demonstration
  private mockUsers: User[] = [
    {
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
    },
    {
      id: '789012',
      email: 'janedoe@example.com',
      displayName: 'Jane Doe',
      photoURL: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Frontend developer specializing in React and Angular applications',
      certifications: ['React Certified Developer', 'Angular Expert'],
      username: 'janedoe',
      projects: [
        {
          id: '3',
          title: 'Portfolio Website',
          description: 'A personal portfolio website with React and Tailwind CSS',
          link: 'https://github.com/janedoe/portfolio'
        },
        {
          id: '4',
          title: 'Weather Dashboard',
          description: 'A weather dashboard with Angular and OpenWeatherMap API',
          link: 'https://github.com/janedoe/weather'
        }
      ]
    }
  ];
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
    // const index = this.mockUsers.findIndex(u => u.id === userId);
    
    // if (index !== -1) {
    //   this.mockUsers[index] = { ...this.mockUsers[index], ...userData };
      
    //   // In a real app, update user in database and then return the updated user
    //   return of(this.mockUsers[index]);
    // }
    
    // User not found, return null wrapped in an observable
    console.log('User Data: ', {userData, userId})
    const userRef = doc(this.firestore, `users/${userId}`);
    setDoc(userRef, userData as User, {merge: true});
    return of(userData as User);
  }


  // updateUser(id: string, data: Partial<User>): Promise<void> {
    
  // }
}