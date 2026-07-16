import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  activeSection = signal('home');

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150; // offset for header

    sections.forEach(section => {
      const id = section.getAttribute('id');
      if (id) {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection.set(id);
        }
      }
    });
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      this.activeSection.set(sectionId);
    }
  }
}
