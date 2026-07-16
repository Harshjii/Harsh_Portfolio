import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  constructor(private storageService: StorageService) {}

  trackClick(projectName: string) {
    this.storageService.trackProjectClick(projectName).subscribe({
      next: (res: any) => {
        console.log(`[Metrics] "${projectName}" click recorded successfully:`, res);
      },
      error: (err) => {
        console.error(`[Metrics] Error tracking click for "${projectName}":`, err);
      }
    });
  }
}
