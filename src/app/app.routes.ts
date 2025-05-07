import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./features/profile/edit-profile/edit-profile.component').then(c => c.EditProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'developers',
    loadComponent: () => import('./features/developers/developers.component').then(c => c.DevelopersComponent)
  },
  {
    path: 'developer/:username',
    loadComponent: () => import('./features/developers/developer-detail/developer-detail.component').then(c => c.DeveloperDetailComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];