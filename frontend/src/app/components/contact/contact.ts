import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  constructor(private storageService: StorageService) {}

  downloadResume(event: Event) {
    event.preventDefault();
    window.open('resume.pdf');
  }

  onSubmit(event: Event, name: string, email: string, subject: string, message: string) {
    event.preventDefault();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || 'New Message from Contact Form',
      message: message.trim()
    };

    this.storageService.saveMessage(payload).subscribe({
      next: (res: any) => {
        alert('Message Sent Successfully!');
        const form = event.target as HTMLFormElement;
        form.reset();
      },
      error: (err) => {
        console.error('Failed to send message:', err);
        alert('Failed to send message. Please check if your backend is running.');
      }
    });
  }
}
