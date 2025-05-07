import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="container developers-container">
      <div class="developers-header">
        <h1 class="page-title">Discover Developers</h1>
        <p class="page-subtitle">Connect with talented developers from around the world</p>
      </div>
      
      <div class="search-bar">
        <div class="search-input-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            class="search-input" 
            placeholder="Search by name or skills..." 
            [formControl]="searchControl"
          >
        </div>
      </div>
      
      <div class="developers-grid">
        <div class="developer-card" *ngFor="let developer of filteredDevelopers">
          <div class="developer-card-header">
            <img [src]="developer.photoURL" alt="{{ developer.displayName }}" class="developer-avatar">
            <div class="developer-info">
              <h2 class="developer-name">{{ developer.displayName }}</h2>
              <span class="developer-username">{{ developer.username }}</span>
            </div>
          </div>
          
          <p class="developer-bio">{{ developer.bio }}</p>
          
          <div class="developer-certifications" *ngIf="developer.certifications && developer.certifications.length > 0">
            <h3 class="certifications-title">Certifications</h3>
            <div class="certifications-list">
              <span class="certification-tag" *ngFor="let cert of developer.certifications">{{ cert }}</span>
            </div>
          </div>
          
          <div class="project-count">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <span>{{ developer.projects?.length || 0 }} Projects</span>
          </div>
          
          <div class="developer-card-footer">
            <a [routerLink]="['/developer', developer.username]" class="btn btn-primary btn-block">View Profile</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .developers-container {
      padding-top: var(--space-6);
      padding-bottom: var(--space-8);
    }
    
    .developers-header {
      text-align: center;
      margin-bottom: var(--space-6);
    }
    
    .page-title {
      font-size: 2.25rem;
      margin-bottom: var(--space-2);
    }
    
    .page-subtitle {
      color: var(--neutral-600);
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .search-bar {
      margin-bottom: var(--space-6);
    }
    
    .search-input-container {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .search-icon {
      position: absolute;
      left: var(--space-3);
      top: 50%;
      transform: translateY(-50%);
      color: var(--neutral-500);
    }
    
    .search-input {
      width: 100%;
      padding: var(--space-3) var(--space-3) var(--space-3) calc(var(--space-3) * 2 + 20px);
      border-radius: var(--radius-full);
      border: 1px solid var(--neutral-300);
      font-size: 1rem;
      box-shadow: var(--shadow-sm);
      transition: border-color var(--transition-fast) ease, box-shadow var(--transition-fast) ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: var(--primary-400);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }
    
    .developers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-5);
    }
    
    .developer-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform var(--transition-normal) ease, box-shadow var(--transition-normal) ease;
    }
    
    .developer-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .developer-card-header {
      display: flex;
      align-items: center;
      margin-bottom: var(--space-4);
    }
    
    .developer-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: var(--space-3);
    }
    
    .developer-info {
      flex: 1;
    }
    
    .developer-name {
      font-size: 1.25rem;
      margin-bottom: var(--space-1);
    }
    
    .developer-username {
      color: var(--neutral-600);
      font-size: 0.875rem;
    }
    
    .developer-bio {
      color: var(--neutral-700);
      margin-bottom: var(--space-4);
      flex-grow: 1;
    }
    
    .developer-certifications {
      margin-bottom: var(--space-4);
    }
    
    .certifications-title {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--neutral-600);
      margin-bottom: var(--space-2);
    }
    
    .certifications-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .certification-tag {
      background-color: var(--primary-50);
      color: var(--primary-700);
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-full);
      font-weight: 500;
    }
    
    .project-count {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--neutral-600);
      font-size: 0.875rem;
      margin-bottom: var(--space-4);
    }
    
    .developer-card-footer {
      margin-top: auto;
    }
    
    .btn-block {
      width: 100%;
    }
  `]
})
export class DevelopersComponent implements OnInit {
  developers: User[] = [];
  filteredDevelopers: User[] = [];
  searchControl = new FormControl('');
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.developers = users;
      this.filteredDevelopers = [...users];
    });
    
    this.searchControl.valueChanges.subscribe(value => {
      this.filterDevelopers(value || '');
    });
  }
  
  filterDevelopers(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredDevelopers = [...this.developers];
      return;
    }
    
    const term = searchTerm.toLowerCase();
    
    this.filteredDevelopers = this.developers.filter(dev => {
      // Search by name or username
      if (
        dev.displayName.toLowerCase().includes(term) ||
        dev.username.toLowerCase().includes(term) ||
        (dev.bio && dev.bio.toLowerCase().includes(term))
      ) {
        return true;
      }
      
      // Search by certifications
      if (dev.certifications && dev.certifications.some(cert => cert.toLowerCase().includes(term))) {
        return true;
      }
      
      // Search by project titles or descriptions
      if (dev.projects && dev.projects.some(project => 
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(term)))
      )) {
        return true;
      }
      
      return false;
    });
  }
}