import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  downloadResume(event: Event) {
    event.preventDefault();
    window.open('resume.pdf');
  }
}
