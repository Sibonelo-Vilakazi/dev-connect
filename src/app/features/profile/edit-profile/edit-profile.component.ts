import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User, Project } from '../../../core/models/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="container edit-profile-container" *ngIf="profileForm">
      <h1 class="page-title">Edit Profile</h1>
      
      <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
        <div class="form-card">
          <h2 class="card-title">Basic Information</h2>
          
          <div class="form-section">
            <div class="form-avatar">
              <div class="avatar-container">
                <img [src]="profileForm.get('photoURL')?.value || 'assets/default-avatar.png'" alt="Profile" class="avatar-preview">
                <button type="button" class="avatar-upload-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Upload Photo
                </button>
              </div>
            </div>
            
            <div class="form-fields">
              <div class="form-group">
                <label for="displayName" class="form-label">Full Name</label>
                <input type="text" id="displayName" formControlName="displayName" class="form-control" placeholder="John Doe">
                <div *ngIf="profileForm.get('displayName')?.touched && profileForm.get('displayName')?.invalid" class="error-message">
                  Full name is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" formControlName="username" class="form-control" placeholder="johndoe">
                <div *ngIf="profileForm.get('username')?.touched && profileForm.get('username')?.invalid" class="error-message">
                  Username is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="bio" class="form-label">Bio</label>
                <textarea id="bio" formControlName="bio" class="form-control" rows="4" placeholder="Tell us about yourself..."></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-card">
          <h2 class="card-title">Certifications</h2>
          
          <div formArrayName="certifications">
            <div class="certification-item" *ngFor="let cert of certificationsArray.controls; let i = index">
              <input type="text" [formControlName]="i" class="form-control" placeholder="e.g., AWS Certified Developer">
              <button type="button" class="btn btn-icon btn-danger" (click)="removeCertification(i)" aria-label="Remove certification">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <button type="button" class="btn btn-outline btn-add" (click)="addCertification()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              Add Certification
            </button>
          </div>
        </div>
        
        <div class="form-card">
          <h2 class="card-title">Projects</h2>
          
          <div formArrayName="projects">
            <div class="project-form" *ngFor="let project of projectsArray.controls; let i = index" [formGroupName]="i">
              <div class="project-form-header">
                <h3 class="project-form-title">Project {{ i + 1 }}</h3>
                <button type="button" class="btn btn-icon btn-danger" (click)="removeProject(i)" aria-label="Remove project">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              
              <div class="form-group">
                <label [for]="'projectTitle' + i" class="form-label">Project Title</label>
                <input type="text" [id]="'projectTitle' + i" formControlName="title" class="form-control" placeholder="e.g., E-commerce Platform">
                <div *ngIf="project.get('title')?.touched && project.get('title')?.invalid" class="error-message">
                  Project title is required
                </div>
              </div>
              
              <div class="form-group">
                <label [for]="'projectDescription' + i" class="form-label">Description</label>
                <textarea [id]="'projectDescription' + i" formControlName="description" class="form-control" rows="3" placeholder="Describe your project..."></textarea>
                <div *ngIf="project.get('description')?.touched && project.get('description')?.invalid" class="error-message">
                  Description is required
                </div>
              </div>
              
              <div class="form-group">
                <label [for]="'projectLink' + i" class="form-label">Link (Optional)</label>
                <input type="url" [id]="'projectLink' + i" formControlName="link" class="form-control" placeholder="https://github.com/yourusername/project">
              </div>
              
              <div class="form-group">
                <label [for]="'projectTechnologies' + i" class="form-label">Technologies (Optional, comma separated)</label>
                <input type="text" [id]="'projectTechnologies' + i" formControlName="technologiesInput" class="form-control" placeholder="React, Node.js, MongoDB">
              </div>
            </div>
            
            <button type="button" class="btn btn-outline btn-add" (click)="addProject()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              Add Project
            </button>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-outline" routerLink="/profile">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="profileForm.invalid || saving">Save Changes</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-profile-container {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
    
    .page-title {
      margin-bottom: var(--space-5);
      font-size: 1.875rem;
    }
    
    .form-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-5);
      margin-bottom: var(--space-5);
    }
    
    .card-title {
      font-size: 1.25rem;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .form-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }
    
    @media (min-width: 768px) {
      .form-section {
        flex-direction: row;
      }
    }
    
    .form-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    @media (min-width: 768px) {
      .form-avatar {
        width: 200px;
        flex-shrink: 0;
      }
    }
    
    .avatar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
    }
    
    .avatar-preview {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--neutral-200);
    }
    
    .avatar-upload-btn {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      background: none;
      border: none;
      color: var(--primary-600);
      font-weight: 500;
      cursor: pointer;
      padding: var(--space-2);
    }
    
    .avatar-upload-btn:hover {
      text-decoration: underline;
    }
    
    .form-fields {
      flex: 1;
    }
    
    .certification-item {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }
    
    .btn-icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 0;
    }
    
    .btn-danger {
      background-color: var(--error-50);
      color: var(--error-600);
      border: 1px solid var(--error-200);
    }
    
    .btn-danger:hover {
      background-color: var(--error-100);
    }
    
    .btn-add {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-2);
    }
    
    .project-form {
      border: 1px solid var(--neutral-300);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      margin-bottom: var(--space-4);
    }
    
    .project-form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
    }
    
    .project-form-title {
      font-size: 1.125rem;
      margin-bottom: 0;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-3);
      margin-top: var(--space-6);
    }
  `]
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup | null = null;
  saving = false;
  user: User | null = null;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    
    if (this.user) {
      this.initForm();
    } else {
      // Redirect to login if no user
      this.router.navigate(['/login']);
    }
  }
  
  initForm(): void {
    this.profileForm = this.fb.group({
      displayName: [this.user?.displayName || '', Validators.required],
      username: [this.user?.username || '', Validators.required],
      bio: [this.user?.bio || ''],
      photoURL: [this.user?.photoURL || ''],
      certifications: this.fb.array([]),
      projects: this.fb.array([])
    });
    
    // Add existing certifications
    if (this.user?.certifications && this.user.certifications.length > 0) {
      this.user.certifications.forEach(cert => {
        this.certificationsArray.push(this.fb.control(cert));
      });
    }
    
    // Add existing projects
    if (this.user?.projects && this.user.projects.length > 0) {
      this.user.projects.forEach(project => {
        this.projectsArray.push(this.createProjectFormGroup(project));
      });
    }
  }
  
  get certificationsArray(): FormArray {
    return this.profileForm?.get('certifications') as FormArray;
  }
  
  get projectsArray(): FormArray {
    return this.profileForm?.get('projects') as FormArray;
  }
  
  addCertification(): void {
    this.certificationsArray.push(this.fb.control(''));
  }
  
  removeCertification(index: number): void {
    this.certificationsArray.removeAt(index);
  }
  
  createProjectFormGroup(project?: Project): FormGroup {
    return this.fb.group({
      id: [project?.id || `proj-${Date.now()}`],
      title: [project?.title || '', Validators.required],
      description: [project?.description || '', Validators.required],
      link: [project?.link || ''],
      technologiesInput: [project?.technologies ? project.technologies.join(', ') : ''],
      technologies: [project?.technologies || []]
    });
  }
  
  addProject(): void {
    this.projectsArray.push(this.createProjectFormGroup());
  }
  
  removeProject(index: number): void {
    this.projectsArray.removeAt(index);
  }
  
  saveProfile(): void {
    if (this.profileForm?.invalid || !this.user) {
      return;
    }
    
    this.saving = true;
    
    // Process projects to convert technologiesInput to technologies array
    const projectControls = this.projectsArray.controls;
    
    for (let i = 0; i < projectControls.length; i++) {
      const project = projectControls[i] as FormGroup;
      const techInput = project.get('technologiesInput')?.value;
      
      if (techInput) {
        const techArray = techInput
          .split(',')
          .map((item: string) => item.trim())
          .filter((item: string) => item !== '');
        
        project.get('technologies')?.setValue(techArray);
      }
    }
    
    // Get form values
    const formValue = this.profileForm?.value;
    
    // Update user object
    this.userService.updateUser(this.user.id, formValue).subscribe({
      next: (updatedUser) => {
        // Update auth service with updated user
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Navigate back to profile
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.saving = false;
      }
    });
  }
}