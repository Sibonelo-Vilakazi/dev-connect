import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { FirebaseService, firebaseConfig } from './app/core/services/firebase.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthService } from './app/core/services/auth.service';
import { getAnalytics,  } from 'firebase/analytics';
import { provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics'; 

// Firebase configurations would be added here
export function waitForAuth(authService: FirebaseService) {
  return () => authService.authReady;
}
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    {
      provide: APP_INITIALIZER,
      useFactory: waitForAuth,
      deps: [FirebaseService],
      multi: true
    },
    ScreenTrackingService
    
  ]
}).catch(err => console.error(err));