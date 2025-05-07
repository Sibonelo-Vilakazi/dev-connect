import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <span class="logo-text">Dev<span class="logo-accent">Connect</span></span>
            <p class="footer-tagline">Connect, collaborate, and grow with other developers</p>
          </div>
          
          <div class="footer-links">
            <div class="footer-links-group">
              <h5 class="footer-heading">Navigation</h5>
              <ul class="footer-list">
                <li><a routerLink="/" class="footer-link">Home</a></li>
                <li><a routerLink="/developers" class="footer-link">Developers</a></li>
                <li><a routerLink="/login" class="footer-link">Login</a></li>
                <li><a routerLink="/register" class="footer-link">Sign Up</a></li>
              </ul>
            </div>
            
            <div class="footer-links-group">
              <h5 class="footer-heading">Resources</h5>
              <ul class="footer-list">
                <li><a href="#" class="footer-link">Documentation</a></li>
                <li><a href="#" class="footer-link">Blog</a></li>
                <li><a href="#" class="footer-link">Tutorials</a></li>
                <li><a href="#" class="footer-link">FAQs</a></li>
              </ul>
            </div>
            
            <div class="footer-links-group">
              <h5 class="footer-heading">Legal</h5>
              <ul class="footer-list">
                <li><a href="#" class="footer-link">Privacy Policy</a></li>
                <li><a href="#" class="footer-link">Terms of Service</a></li>
                <li><a href="#" class="footer-link">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="copyright">
            &copy; 2025 DevConnect. All rights reserved.
          </div>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-900);
      color: var(--neutral-300);
      padding: var(--space-6) 0 var(--space-4);
      margin-top: var(--space-8);
    }
    
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      padding-bottom: var(--space-6);
      border-bottom: 1px solid var(--neutral-700);
    }
    
    @media (min-width: 768px) {
      .footer-content {
        flex-direction: row;
      }
    }
    
    .footer-logo {
      flex: 1;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
    }
    
    .logo-accent {
      color: var(--primary-500);
    }
    
    .footer-tagline {
      margin-top: var(--space-3);
      color: var(--neutral-400);
      max-width: 300px;
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--space-6);
      flex: 2;
    }
    
    .footer-heading {
      color: white;
      margin-bottom: var(--space-3);
      font-size: 1rem;
    }
    
    .footer-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-list li {
      margin-bottom: var(--space-2);
    }
    
    .footer-link {
      color: var(--neutral-400);
      text-decoration: none;
      transition: color var(--transition-fast) ease;
    }
    
    .footer-link:hover {
      color: white;
      text-decoration: none;
    }
    
    .footer-bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding-top: var(--space-4);
    }
    
    @media (min-width: 768px) {
      .footer-bottom {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    
    .copyright {
      color: var(--neutral-500);
      font-size: 0.875rem;
    }
    
    .social-links {
      display: flex;
      gap: var(--space-3);
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--neutral-800);
      color: var(--neutral-300);
      transition: all var(--transition-fast) ease;
    }
    
    .social-link:hover {
      background-color: var(--primary-600);
      color: white;
      transform: translateY(-2px);
    }
  `]
})
export class FooterComponent {}