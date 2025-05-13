import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Project, User } from '../../../core/models/user.model';
import { Helpers } from '../../../shared/utils/utils';
import { user } from '@angular/fire/auth';
import { AuthService } from '../../../core/services/auth.service';

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
    public helper: Helpers,
    public authService: AuthService
  ) {}
  
  async ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    const visitorId = await this.userService.getVisitorId() as string;
    if (username) {
      const user = await this.userService.getUserByUsername(username)
      if (user) {
        this.developer = user;
        const isViewed = this.developer.views?.includes(visitorId ?? []);
        if(!isViewed){
          if(this.developer.views == undefined){
            this.developer.views = [visitorId];
          }else {
            this.developer.views.push(visitorId)
          }
          this.userService.updateUser(this.developer.id,this.developer).subscribe({
            next: (res) =>{
              this.developer = res; 
            },
            error: (err) =>{
              console.error(err);
            }
          })
        }

      } else {
        // Redirect to 404 if user not found
        this.router.navigate(['/not-found']);
      }
    } else {
      // Redirect to developers list if no username provided
      this.router.navigate(['/developers']);
    }
  }

  

  async handleOpenLink(project: Project, index: number){
      window.open(project.link, '_blank');
     const visitorId = await this.userService.getVisitorId();
    
    if(visitorId){
    
      const hasViewed = (project.visitors ?? []).includes(visitorId);
      if(!hasViewed && this.developer && this.developer.projects){
        if(!this.developer.projects[index].visitors || this.developer.projects[index].visitors === undefined){
          this.developer.projects[index].visitors = [visitorId];
        }else {
          (this.developer.projects[index].visitors ?? []).push(visitorId);

        }
       
        this.userService.updateUser(this.developer.id, this.developer).subscribe({
          next: (updatedUser: any) => {
          // Update auth service with updated user
          
          this.ngOnInit()
        }});
      }

      }
  }


 async handleConnect(){
    const currentUserId = this.authService.getCurrentUser()?.id ?? '';
    //const visitorId = await this.userService.getVisitorId(); 

    const isViewed = (this.developer?.connections ?? []).includes(currentUserId);
        if(!isViewed && this.developer){
          if(this.developer?.connections == undefined){
            this.developer.connections = [currentUserId];
          }else {
            this.developer.connections.push(currentUserId)
          }
          this.userService.updateUser(this.developer.id, this.developer).subscribe({
            next: (res) =>{
              this.developer = res; 
            },
            error: (err) =>{
              console.error(err);
            }
          })
        }
  }
}