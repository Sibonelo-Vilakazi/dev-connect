import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './app/core/services/firebase.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Firebase configurations would be added here

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    // importProvidersFrom(
    //   FirebaseModule, // This would be added once Firebase is properly set up
    // ),
  ]
}).catch(err => console.error(err));