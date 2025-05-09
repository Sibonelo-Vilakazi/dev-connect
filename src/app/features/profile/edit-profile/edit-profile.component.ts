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
  templateUrl: 'edit-profile.component.html',
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

    if(this.user?.id){
      this.userService.getUserById(this.user?.id ?? '').subscribe({
        next: (res) => {
          console.log(res);
          this.user = Object.assign({...this.user}, {...res});
          console.log(this.user);
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
      })

      
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
      next: (updatedUser: any) => {
        // Update auth service with updated user
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.authService.setUserFromDatabase(updatedUser);
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