import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import Lenis from 'lenis';

import { AppComponent } from './app/app.component';
//import { environment } from './environments/environment';

//if (environment.production) {
enableProdMode();
//}

// אתחול גלילה חלקה
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  autoRaf: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// אתחול האפליקציה
bootstrapApplication(AppComponent).catch((err) => console.error(err));
