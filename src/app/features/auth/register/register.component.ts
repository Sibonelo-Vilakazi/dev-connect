import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: `./register.component.html`,
  styleUrls: [`./register.component.scss`]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  showForm: boolean = false;
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