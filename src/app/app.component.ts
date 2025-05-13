import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/services/auth.service';
import {  onAuthStateChanged } from 'firebase/auth';
import { FirebaseService } from './core/services/firebase.service';
import { User } from './core/models/user.model';
import { Analytics } from '@angular/fire/analytics';
import { filter } from 'rxjs';
import { logEvent } from 'firebase/analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
  `]
})
export class AppComponent {
  
  constructor(private firebaseService: FirebaseService, 
    private analytics: Analytics, private router: Router) {
    // Initialize authentication state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      logEvent(this.analytics, 'page_view', {
        page_path: event.urlAfterRedirects
      });
    });

   
  }

  
}