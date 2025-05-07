import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">Join DevConnect</h1>
          <p class="auth-subtitle">Create an account to get started</p>
        </div>
        
        <div class="auth-social">
          <button (click)="signInWithGoogle()" class="btn btn-google">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
              <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
              <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
              <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>
        
        <div class="auth-divider">
          <span>or</span>
        </div>
        
        <div class="auth-form">
          <form [formGroup]="registerForm" (ngSubmit)="register()">
            <div class="form-group">
              <label for="name" class="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                formControlName="name"
                class="form-control"
                placeholder="John Doe"
              />
              <div *ngIf="registerForm.get('name')?.touched && registerForm.get('name')?.invalid" class="error-message">
                Full name is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                formControlName="email"
                class="form-control"
                placeholder="your.email@example.com"
              />
              <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid" class="error-message">
                Please enter a valid email
              </div>
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                formControlName="password"
                class="form-control"
                placeholder="••••••••"
              />
              <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="error-message">
                Password must be at least 8 characters
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                formControlName="confirmPassword"
                class="form-control"
                placeholder="••••••••"
              />
              <div *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.get('confirmPassword')?.invalid" class="error-message">
                Passwords must match
              </div>
            </div>
            
            <div class="form-group">
              <div class="checkbox-container">
                <input type="checkbox" id="terms" formControlName="terms" class="checkbox-input" />
                <label for="terms" class="checkbox-label">
                  I agree to the <a href="#" class="auth-link">Terms of Service</a> and <a href="#" class="auth-link">Privacy Policy</a>
                </label>
              </div>
              <div *ngIf="registerForm.get('terms')?.touched && registerForm.get('terms')?.invalid" class="error-message">
                You must agree to the terms
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block" [disabled]="registerForm.invalid">
              Create Account
            </button>
            
            <div *ngIf="errorMessage" class="error-alert">
              {{ errorMessage }}
            </div>
          </form>
        </div>
        
        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login" class="auth-link">Log in</a></p>
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
    
    .checkbox-container {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
    }
    
    .checkbox-input {
      margin-top: 0.25rem;
    }
    
    .checkbox-label {
      font-size: 0.875rem;
      color: var(--neutral-700);
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
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    
    return null;
  }
  
  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    
    // In a real app, we would register with email/password here
    // For this demo, just use Google sign-in
    this.signInWithGoogle();
  }
  
  signInWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe({
      next: (user) => {
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Authentication error:', error);
        this.errorMessage = 'Failed to register. Please try again.';
      }
    });
  }
}