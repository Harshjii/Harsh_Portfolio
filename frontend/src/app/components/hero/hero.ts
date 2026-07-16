import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  subtitle = signal('');
  
  private typingTexts = [
    "Web Developer",
    "App Developer",
    "React Developer",
    "MEAN Stack Developer"
  ];
  private textIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimeout: any;

  bugsResolved = signal(0);
  appsDelivered = signal(0);
  mlAccuracy = signal(0);
  onTimeDelivery = signal(0);

  ngOnInit() {
    this.startTyping();
    this.startCounters();
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  startTyping() {
    const currentText = this.typingTexts[this.textIndex];
    
    if (!this.isDeleting) {
      this.subtitle.set(currentText.substring(0, this.charIndex++));
      if (this.charIndex > currentText.length) {
        this.isDeleting = true;
        this.typingTimeout = setTimeout(() => this.startTyping(), 1200);
        return;
      }
    } else {
      this.subtitle.set(currentText.substring(0, this.charIndex--));
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.typingTexts.length;
      }
    }
    
    this.typingTimeout = setTimeout(() => this.startTyping(), this.isDeleting ? 50 : 100);
  }

  startCounters() {
    this.animateCounter(15, (val) => this.bugsResolved.set(val));
    this.animateCounter(3, (val) => this.appsDelivered.set(val));
    this.animateCounter(87, (val) => this.mlAccuracy.set(val));
    this.animateCounter(100, (val) => this.onTimeDelivery.set(val));
  }

  private animateCounter(target: number, updateFn: (val: number) => void) {
    let count = 0;
    const increment = target / 80;
    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        updateFn(target);
        clearInterval(interval);
      } else {
        updateFn(Math.ceil(count));
      }
    }, 20);
  }

  scrollToProjects(event: Event) {
    event.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact(event: Event) {
    event.preventDefault();
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
