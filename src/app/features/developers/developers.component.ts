import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./developers.component.html`,
  styleUrls: [`./developers.component.scss`]
})
export class DevelopersComponent implements OnInit {
  developers: User[] = [];
  filteredDevelopers: User[] = [];
  searchControl = new FormControl('');
  
  constructor(private userService: UserService, private router: Router) {}
  
  async ngOnInit() {
    const users = await this.userService.getUsers();
      this.developers = users;
      this.filteredDevelopers = [...users];
   
    
    this.searchControl.valueChanges.subscribe(value => {
      this.filterDevelopers(value || '');
    });
  }
  
  filterDevelopers(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredDevelopers = [...this.developers];
      return;
    }
    
    const term = searchTerm.toLowerCase();
    
    this.filteredDevelopers = this.developers.filter(dev => {
      // Search by name or username
      if (
        dev.displayName.toLowerCase().includes(term) ||
        dev.username.toLowerCase().includes(term) ||
        (dev.bio && dev.bio.toLowerCase().includes(term))
      ) {
        return true;
      }
      
      // Search by certifications
      if (dev.certifications && dev.certifications.some(cert => cert.toLowerCase().includes(term))) {
        return true;
      }
      
      // Search by project titles or descriptions
      if (dev.projects && dev.projects.some(project => 
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(term)))
      )) {
        return true;
      }
      
      return false;
    });
  }


  handleRouter(route: string){
    //const router: Router = inject(Router);

    this.router.navigateByUrl(route)
  }
}