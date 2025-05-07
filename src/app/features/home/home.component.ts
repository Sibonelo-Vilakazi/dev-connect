import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title animate-slideInUp">Connect with developers.<br>Showcase your work.</h1>
            <p class="hero-subtitle animate-slideInUp">Join a community of passionate developers, share your projects, and grow your network.</p>
            <div class="hero-cta animate-slideInUp">
              <a routerLink="/register" class="btn btn-primary btn-lg" *ngIf="!isAuthenticated">Get Started</a>
              <a routerLink="/developers" class="btn btn-outline btn-lg">Browse Developers</a>
            </div>
          </div>
          <div class="hero-image animate-fadeIn">
            <!-- Hero image would go here -->
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Why DevConnect?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 class="feature-title">Connect with Peers</h3>
              <p class="feature-description">Find and connect with like-minded developers in your field or across different disciplines.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 class="feature-title">Showcase Projects</h3>
              <p class="feature-description">Display your work in a professional portfolio that highlights your skills and achievements.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <h3 class="feature-title">Share Knowledge</h3>
              <p class="feature-description">Learn from others and contribute to the community by sharing your expertise and experience.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Call to Action Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to join our community?</h2>
            <p class="cta-description">Create your profile today and connect with developers from around the world.</p>
            <div class="cta-buttons">
              <a routerLink="/register" class="btn btn-primary" *ngIf="!isAuthenticated">Create Account</a>
              <a routerLink="/developers" class="btn btn-outline">Explore Profiles</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: calc(100vh - 70px);
    }
    
    /* Hero Section */
    .hero-section {
      padding: var(--space-8) 0;
    }
    
    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--space-4);
      color: var(--neutral-900);
    }
    
    @media (min-width: 768px) {
      .hero-title {
        font-size: 3.5rem;
      }
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      color: var(--neutral-600);
      margin-bottom: var(--space-6);
      max-width: 600px;
    }
    
    .hero-cta {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .btn-lg {
      padding: var(--space-3) var(--space-5);
      font-size: 1rem;
    }
    
    /* Features Section */
    .features-section {
      padding: var(--space-8) 0;
      background-color: var(--neutral-100);
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--space-6);
      color: var(--neutral-900);
      font-size: 2rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-5);
    }
    
    .feature-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-5);
      text-align: center;
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-normal) ease, box-shadow var(--transition-normal) ease;
    }
    
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      background-color: var(--primary-100);
      color: var(--primary-600);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-4);
    }
    
    .feature-title {
      margin-bottom: var(--space-3);
      font-size: 1.25rem;
    }
    
    .feature-description {
      color: var(--neutral-600);
      font-size: 1rem;
    }
    
    /* CTA Section */
    .cta-section {
      padding: var(--space-8) 0;
      background-color: var(--primary-900);
      color: white;
    }
    
    .cta-content {
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
    }
    
    .cta-title {
      color: white;
      font-size: 2rem;
      margin-bottom: var(--space-3);
    }
    
    .cta-description {
      color: var(--primary-200);
      font-size: 1.125rem;
      margin-bottom: var(--space-5);
    }
    
    .cta-buttons {
      display: flex;
      gap: var(--space-3);
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .cta-section .btn-outline {
      border-color: var(--primary-300);
      color: white;
    }
    
    .cta-section .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class HomeComponent {
  isAuthenticated = false;
  
  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}