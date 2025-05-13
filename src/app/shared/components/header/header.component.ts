import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: `./header.component.html`,
  styleUrls: [`./header.component.scss`]
})
export class HeaderComponent {
  currentUser: User | null = null;
  user: User | null  = null;
  userMenuOpen = false;
  mobileMenuOpen = false;
  @Output() connectUser: EventEmitter<boolean> = new EventEmitter()
  constructor(public authService: AuthService, private router: Router,
    
  ) {
    this.user = authService.getUserFromDatabase();
    
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = authService.getCurrentUser();
      
      
    });
  }
  handleOpenRoute(route: string) {
    this.router.navigateByUrl(route)
  }
  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  logout(): void {
    this.authService.signOut();
    this.userMenuOpen = false;
    this.mobileMenuOpen = false;
    localStorage.clear();
  }


 
}