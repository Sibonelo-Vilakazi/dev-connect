import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">Log in to DevConnect</h1>
          <p class="auth-subtitle">Welcome back! Please log in to your account.</p>
        </div>
        
        <div class="auth-social">
          <button (click)="signInWithGoogle()" class="btn btn-google">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
              <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
              <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
              <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
        
        <div class="auth-divider">
          <span>or</span>
        </div>
        
        <div class="auth-form">
          <form [formGroup]="loginForm" (ngSubmit)="login()">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                formControlName="email"
                class="form-control"
                placeholder="your.email@example.com"
              />
              <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid" class="error-message">
                Please enter a valid email
              </div>
            </div>
            
            <div class="form-group">
              <div class="form-label-group">
                <label for="password" class="form-label">Password</label>
                <a href="#" class="forgot-password">Forgot password?</a>
              </div>
              <input
                type="password"
                id="password"
                formControlName="password"
                class="form-control"
                placeholder="••••••••"
              />
              <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid" class="error-message">
                Password is required
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid">
              Log in
            </button>
            
            <div *ngIf="errorMessage" class="error-alert">
              {{ errorMessage }}
            </div>
          </form>
        </div>
        
        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register" class="auth-link">Sign up</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      padding: var(--space-4);
    }
    
    .auth-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 480px;
      padding: var(--space-6);
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: var(--space-5);
    }
    
    .auth-title {
      font-size: 1.875rem;
      color: var(--neutral-900);
      margin-bottom: var(--space-2);
    }
    
    .auth-subtitle {
      color: var(--neutral-600);
      font-size: 1rem;
    }
    
    .auth-social {
      margin-bottom: var(--space-4);
    }
    
    .btn-google {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      width: 100%;
      background-color: white;
      border: 1px solid var(--neutral-300);
      color: var(--neutral-800);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-weight: 500;
      transition: background-color var(--transition-fast) ease;
    }
    
    .btn-google:hover {
      background-color: var(--neutral-100);
    }
    
    .auth-divider {
      display: flex;
      align-items: center;
      margin: var(--space-4) 0;
      color: var(--neutral-500);
    }
    
    .auth-divider::before,
    .auth-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: var(--neutral-300);
    }
    
    .auth-divider span {
      padding: 0 var(--space-2);
    }
    
    .auth-form {
      margin-bottom: var(--space-5);
    }
    
    .form-label-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .forgot-password {
      font-size: 0.875rem;
      color: var(--primary-600);
    }
    
    .btn-block {
      width: 100%;
      margin-top: var(--space-4);
      padding: var(--space-3);
    }
    
    .error-message {
      color: var(--error-600);
      font-size: 0.875rem;
      margin-top: var(--space-1);
    }
    
    .error-alert {
      background-color: var(--error-100);
      color: var(--error-700);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      margin-top: var(--space-4);
      font-size: 0.875rem;
    }
    
    .auth-footer {
      text-align: center;
      color: var(--neutral-600);
    }
    
    .auth-link {
      color: var(--primary-600);
      font-weight: 500;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  redirectTo: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    // Get redirect URL if any
    this.route.queryParams.subscribe(params => {
      this.redirectTo = params['redirectTo'] || null;
    });
  }
  
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    // In a real app, we would authenticate with email/password here
    // For this demo, just redirect to hardcoded user
    this.signInWithGoogle();
  }
  
  signInWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe({
      next: (user) => {
        if (this.redirectTo) {
          this.router.navigateByUrl(this.redirectTo);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      error: (error) => {
        console.error('Authentication error:', error);
        this.errorMessage = 'Failed to authenticate. Please try again.';
      }
    });
  }
}