import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Projects } from './components/projects/projects';
import { Experience } from './components/experience/experience';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Hero,
    Projects,
    Experience,
    About,
    Contact,
    Footer,
    ScrollRevealDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
