import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

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

  constructor() { }

  // Get all users
  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }

  // Get user by username
  getUserByUsername(username: string): Observable<User | null> {
    const user = this.mockUsers.find(u => u.username === username);
    return of(user || null);
  }

  // Update user details
  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    const index = this.mockUsers.findIndex(u => u.id === userId);
    
    if (index !== -1) {
      this.mockUsers[index] = { ...this.mockUsers[index], ...userData };
      
      // In a real app, update user in database and then return the updated user
      return of(this.mockUsers[index]);
    }
    
    // User not found, return null wrapped in an observable
    return of(null as unknown as User);
  }
}