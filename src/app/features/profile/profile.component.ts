import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User, Project } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { Helpers } from '../../shared/utils/utils';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: `./profile.component.html`,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  
  constructor(private authService: AuthService, private userServcie: UserService,
    public helper: Helpers
  ) {}
  
  ngOnInit(): void {
    //this.user = this.authService.getUserFromDatabase();

    if (!this.user) {
      const currentUser = this.authService.getCurrentUser();
      this.userServcie.getUserById(currentUser?.id ?? '').subscribe({
        next: (res) => {
          this.authService.setUserFromDatabase(res);
          this.user = res;
        }
      })
    }
  
  }
  

  async handleOpenLink(project: Project, index: number){
    window.open(project.link, '_blank');
    //  const visitorId = await this.userServcie.getVisitorId();

    // if(visitorId){
    //   // add visitor count
    //   const hasViewed = !(project.visitors ?? []).includes(visitorId);
    //   if(!hasViewed && this.user && this.user.projects){
    //     this.user.projects[index].visitors?.push(visitorId);
    //     console.log('user: ', this.user);
    //   }

    //   }
  }
  



  
}