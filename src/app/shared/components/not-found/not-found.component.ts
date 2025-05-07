import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="not-found-title">404</h1>
        <h2 class="not-found-subtitle">Page Not Found</h2>
        <p class="not-found-message">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a routerLink="/" class="btn btn-primary">Go Home</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      padding: var(--space-6);
    }
    
    .not-found-content {
      max-width: 500px;
    }
    
    .not-found-title {
      font-size: 6rem;
      font-weight: 700;
      color: var(--primary-600);
      line-height: 1;
      margin-bottom: var(--space-2);
    }
    
    .not-found-subtitle {
      font-size: 1.875rem;
      margin-bottom: var(--space-4);
      color: var(--neutral-800);
    }
    
    .not-found-message {
      font-size: 1.125rem;
      color: var(--neutral-600);
      margin-bottom: var(--space-6);
    }
  `]
})
export class NotFoundComponent {}