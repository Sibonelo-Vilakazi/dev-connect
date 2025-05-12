import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./login.component.html`,
  styleUrls: [`./login.component.scss`]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  redirectTo: string | null = null;
  showForm: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
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
    // For this dev-connect, just redirect to hardcoded user
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