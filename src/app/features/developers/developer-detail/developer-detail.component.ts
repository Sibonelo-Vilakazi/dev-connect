import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Helpers } from '../../../shared/utils/utils';

@Component({
  selector: 'app-developer-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./developer-detail.component.html`,
  styleUrls: [`./developer-detail.component.scss`]
})
export class DeveloperDetailComponent implements OnInit {
  developer: User | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public helper: Helpers
  ) {}
  
  async ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    
    if (username) {
      const user = await this.userService.getUserByUsername(username)
      if (user) {
        this.developer = user;
      } else {
        // Redirect to 404 if user not found
        this.router.navigate(['/not-found']);
      }
    } else {
      // Redirect to developers list if no username provided
      this.router.navigate(['/developers']);
    }
  }
}