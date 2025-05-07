import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-developer-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container profile-container" *ngIf="developer; else loading">
      <div class="profile-header">
        <div class="profile-cover"></div>
        <div class="profile-info">
          <div class="profile-avatar">
            <img [src]="developer.photoURL || 'assets/default-avatar.png'" alt="Profile" class="avatar-img">
          </div>
          <div class="profile-title">
            <h1 class="profile-name">{{ developer.displayName }}</h1>
            <div class="profile-username">@{{ developer.username }}</div>
            <p class="profile-bio">{{ developer.bio }}</p>
          </div>
          <div class="profile-actions">
            <button class="btn btn-primary">Connect</button>
            <button class="btn btn-outline">Share Profile</button>
          </div>
        </div>
      </div>
      
      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="sidebar-section" *ngIf="developer.certifications && developer.certifications.length > 0">
            <h2 class="sidebar-title">Certifications</h2>
            <div class="certifications-list">
              <div class="certification-item" *ngFor="let cert of developer.certifications">
                <div class="certification-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                </div>
                <div class="certification-name">{{ cert }}</div>
              </div>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h2 class="sidebar-title">Stats</h2>
            <div class="stats-list">
              <div class="stat-item">
                <div class="stat-value">{{ developer.projects?.length || 0 }}</div>
                <div class="stat-label">Projects</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">0</div>
                <div class="stat-label">Connections</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">0</div>
                <div class="stat-label">Profile Views</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="profile-main">
          <div class="projects-section">
            <div class="section-header">
              <h2 class="section-title">Projects</h2>
            </div>
            
            <div class="projects-grid" *ngIf="developer.projects && developer.projects.length > 0">
              <div class="project-card" *ngFor="let project of developer.projects">
                <div class="project-header">
                  <h3 class="project-title">{{ project.title }}</h3>
                  <a [href]="project.link" target="_blank" class="project-link" *ngIf="project.link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-technologies" *ngIf="project.technologies && project.technologies.length > 0">
                  <span class="technology-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
                </div>
              </div>
            </div>
            
            <div class="empty-projects" *ngIf="!developer.projects || developer.projects.length === 0">
              <div class="empty-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <h3>No projects yet</h3>
                <p>This developer hasn't added any projects yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ng-template #loading>
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .profile-container {
      padding-top: var(--space-6);
    }
    
    .profile-header {
      margin-bottom: var(--space-6);
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }
    
    .profile-cover {
      background-color: var(--primary-600);
      background-image: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
      height: 180px;
    }
    
    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-6) var(--space-4);
      position: relative;
    }
    
    @media (min-width: 768px) {
      .profile-info {
        flex-direction: row;
        align-items: flex-start;
        padding: var(--space-6);
      }
    }
    
    .profile-avatar {
      position: relative;
      margin-top: -90px;
      margin-bottom: var(--space-4);
    }
    
    @media (min-width: 768px) {
      .profile-avatar {
        margin-bottom: 0;
        margin-right: var(--space-5);
      }
    }
    
    .avatar-img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 5px solid white;
      box-shadow: var(--shadow-md);
    }
    
    .profile-title {
      flex: 1;
      text-align: center;
    }
    
    @media (min-width: 768px) {
      .profile-title {
        text-align: left;
      }
    }
    
    .profile-name {
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: var(--space-1);
    }
    
    .profile-username {
      color: var(--neutral-600);
      font-size: 1.125rem;
      margin-bottom: var(--space-3);
    }
    
    .profile-bio {
      color: var(--neutral-700);
      max-width: 600px;
    }
    
    .profile-actions {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-4);
    }
    
    @media (min-width: 768px) {
      .profile-actions {
        margin-top: 0;
      }
    }
    
    .profile-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }
    
    @media (min-width: 768px) {
      .profile-content {
        flex-direction: row;
      }
    }
    
    .profile-sidebar {
      width: 100%;
    }
    
    @media (min-width: 768px) {
      .profile-sidebar {
        width: 300px;
        flex-shrink: 0;
      }
    }
    
    .profile-main {
      flex: 1;
    }
    
    .sidebar-section {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-5);
      margin-bottom: var(--space-5);
    }
    
    .sidebar-title {
      font-size: 1.25rem;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .certifications-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    
    .certification-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .certification-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--primary-100);
      color: var(--primary-600);
    }
    
    .certification-name {
      font-weight: 500;
    }
    
    .stats-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-2);
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-600);
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: var(--neutral-600);
    }
    
    .projects-section {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-5);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-5);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .section-title {
      font-size: 1.25rem;
      margin-bottom: 0;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-4);
    }
    
    .project-card {
      background-color: white;
      border: 1px solid var(--neutral-200);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      transition: transform var(--transition-normal) ease, box-shadow var(--transition-normal) ease;
    }
    
    .project-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-3);
    }
    
    .project-title {
      font-size: 1.125rem;
      margin-bottom: 0;
    }
    
    .project-link {
      color: var(--neutral-600);
      transition: color var(--transition-fast) ease;
    }
    
    .project-link:hover {
      color: var(--primary-600);
    }
    
    .project-description {
      color: var(--neutral-700);
      margin-bottom: var(--space-3);
    }
    
    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .technology-tag {
      background-color: var(--primary-50);
      color: var(--primary-700);
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-full);
      font-weight: 500;
    }
    
    .empty-projects {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--space-8) 0;
    }
    
    .empty-message {
      text-align: center;
      max-width: 350px;
    }
    
    .empty-message svg {
      color: var(--neutral-300);
      margin-bottom: var(--space-3);
    }
    
    .empty-message h3 {
      margin-bottom: var(--space-2);
      font-size: 1.25rem;
    }
    
    .empty-message p {
      color: var(--neutral-600);
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50vh;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--neutral-200);
      border-top-color: var(--primary-600);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: var(--space-3);
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class DeveloperDetailComponent implements OnInit {
  developer: User | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    
    if (username) {
      this.userService.getUserByUsername(username).subscribe(user => {
        if (user) {
          this.developer = user;
        } else {
          // Redirect to 404 if user not found
          this.router.navigate(['/not-found']);
        }
      });
    } else {
      // Redirect to developers list if no username provided
      this.router.navigate(['/developers']);
    }
  }
}