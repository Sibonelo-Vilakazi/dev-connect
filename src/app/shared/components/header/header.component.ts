import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <span class="logo-text">Dev<span class="logo-accent">Connect</span></span>
            </a>
          </div>
          
          <nav class="main-nav">
            <ul class="nav-list">
              <li class="nav-item">
                <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Home</a>
              </li>
              <li class="nav-item">
                <a routerLink="/developers" routerLinkActive="active" class="nav-link">Developers</a>
              </li>
              <ng-container *ngIf="currentUser">
                <li class="nav-item">
                  <a routerLink="/profile" routerLinkActive="active" class="nav-link">My Profile</a>
                </li>
              </ng-container>
            </ul>
          </nav>
          
          <div class="auth-actions">
            <ng-container *ngIf="!currentUser">
              <a routerLink="/login" class="btn btn-outline">Log in</a>
              <a routerLink="/register" class="btn btn-primary">Sign up</a>
            </ng-container>
            
            <ng-container *ngIf="currentUser">
              <div class="user-menu" (click)="toggleUserMenu()" #userMenuTrigger>
                <img [src]="currentUser.photoURL" alt="Profile" class="user-avatar" *ngIf="currentUser.photoURL">
                <div class="user-name">{{ currentUser.displayName }}</div>
                <div class="dropdown-icon">▼</div>
                
                <div class="user-dropdown" *ngIf="userMenuOpen">
                  <a routerLink="/profile" class="dropdown-item">View Profile</a>
                  <a routerLink="/edit-profile" class="dropdown-item">Edit Profile</a>
                  <button class="dropdown-item" (click)="logout()">Logout</button>
                </div>
              </div>
            </ng-container>
          </div>
          
          <button class="mobile-menu-toggle" (click)="toggleMobileMenu()">
            <span class="mobile-menu-icon"></span>
          </button>
        </div>
        
        <div class="mobile-nav" [class.active]="mobileMenuOpen">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="mobile-nav-link">Home</a>
            </li>
            <li class="mobile-nav-item">
              <a routerLink="/developers" routerLinkActive="active" class="mobile-nav-link">Developers</a>
            </li>
            <ng-container *ngIf="currentUser">
              <li class="mobile-nav-item">
                <a routerLink="/profile" routerLinkActive="active" class="mobile-nav-link">My Profile</a>
              </li>
              <li class="mobile-nav-item">
                <a routerLink="/edit-profile" routerLinkActive="active" class="mobile-nav-link">Edit Profile</a>
              </li>
              <li class="mobile-nav-item">
                <button class="mobile-nav-link mobile-logout" (click)="logout()">Logout</button>
              </li>
            </ng-container>
            <ng-container *ngIf="!currentUser">
              <li class="mobile-nav-item">
                <a routerLink="/login" routerLinkActive="active" class="mobile-nav-link">Log in</a>
              </li>
              <li class="mobile-nav-item">
                <a routerLink="/register" routerLinkActive="active" class="mobile-nav-link">Sign up</a>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: white;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    
    .logo-link {
      text-decoration: none;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--neutral-900);
    }
    
    .logo-accent {
      color: var(--primary-600);
    }
    
    .main-nav {
      display: none;
    }
    
    @media (min-width: 768px) {
      .main-nav {
        display: block;
      }
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-item {
      margin-left: var(--space-5);
    }
    
    .nav-link {
      color: var(--neutral-700);
      text-decoration: none;
      font-weight: 500;
      padding: var(--space-2) 0;
      position: relative;
      transition: color var(--transition-fast) ease;
    }
    
    .nav-link:hover {
      color: var(--primary-600);
      text-decoration: none;
    }
    
    .nav-link.active {
      color: var(--primary-600);
    }
    
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--primary-600);
    }
    
    .auth-actions {
      display: none;
    }
    
    @media (min-width: 768px) {
      .auth-actions {
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
      position: relative;
      padding: var(--space-2);
    }
    
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .user-name {
      font-weight: 500;
    }
    
    .dropdown-icon {
      font-size: 0.75rem;
      color: var(--neutral-500);
      margin-left: var(--space-1);
    }
    
    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      width: 200px;
      background-color: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      padding: var(--space-2) 0;
      z-index: 10;
      animation: slideInUp var(--transition-fast) ease;
    }
    
    .dropdown-item {
      display: block;
      padding: var(--space-2) var(--space-4);
      color: var(--neutral-700);
      text-decoration: none;
      transition: background-color var(--transition-fast) ease;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: var(--font-family);
      font-size: 0.875rem;
    }
    
    .dropdown-item:hover {
      background-color: var(--neutral-100);
      color: var(--primary-600);
    }
    
    .mobile-menu-toggle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 18px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }
    
    @media (min-width: 768px) {
      .mobile-menu-toggle {
        display: none;
      }
    }
    
    .mobile-menu-icon {
      position: relative;
      width: 24px;
      height: 2px;
      background-color: var(--neutral-800);
      transition: all var(--transition-fast) ease;
    }
    
    .mobile-menu-icon::before,
    .mobile-menu-icon::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background-color: var(--neutral-800);
      transition: all var(--transition-fast) ease;
    }
    
    .mobile-menu-icon::before {
      top: -8px;
    }
    
    .mobile-menu-icon::after {
      bottom: -8px;
    }
    
    .mobile-nav {
      display: none;
      padding: var(--space-3) 0;
      border-top: 1px solid var(--neutral-200);
    }
    
    .mobile-nav.active {
      display: block;
      animation: slideInUp var(--transition-fast) ease;
    }
    
    .mobile-nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .mobile-nav-item {
      margin-bottom: var(--space-3);
    }
    
    .mobile-nav-link {
      display: block;
      color: var(--neutral-700);
      text-decoration: none;
      font-weight: 500;
      padding: var(--space-2) 0;
      transition: color var(--transition-fast) ease;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: var(--font-family);
      font-size: 1rem;
    }
    
    .mobile-nav-link:hover,
    .mobile-nav-link.active {
      color: var(--primary-600);
    }
    
    .mobile-logout {
      color: var(--error-600);
    }
    
    @media (min-width: 768px) {
      .mobile-nav {
        display: none !important;
      }
    }
  `]
})
export class HeaderComponent {
  currentUser: User | null = null;
  userMenuOpen = false;
  mobileMenuOpen = false;
  
  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  
  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  logout(): void {
    this.authService.signOut();
    this.userMenuOpen = false;
    this.mobileMenuOpen = false;
    localStorage.clear();
  }
}