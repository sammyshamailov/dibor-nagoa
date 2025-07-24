import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { HeroComponent } from './components/hero/hero.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, TopToolbarComponent, HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private lenis!: Lenis;

  ngAfterViewInit(): void {
    // אתחול Lenis לגלילה חלקה
    this.lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      autoRaf: false, // ננהל ידנית
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // הגדרת ScrollTrigger לשימוש עם Lenis
    ScrollTrigger.scrollerProxy('.lenis', {
      scrollTop: (value) => {
        if (arguments.length && value !== undefined) {
          this.lenis.scrollTo(value, { immediate: true });
        }
        return this.lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },

      // אם צריך, הגדר פעולות נוספות לשימוש בסקרולר custom
      pinType: (() => {
        const el = document.querySelector<HTMLElement>('.lenis');
        return el && el.style.transform ? 'transform' : 'fixed';
      })(),
    });

    // כאשר Lenis עושה scroll, עדכן את ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    // עדכן ScrollTrigger כאשר מתבצעת רסייז
    ScrollTrigger.addEventListener('refresh', () =>
      console.log('ScrollTrigger refresh event')
    );
    ScrollTrigger.refresh();
  }
}
