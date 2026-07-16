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
    const count = this.storageService.trackProjectClick(projectName);
    console.log(`[Metrics] "${projectName}" clicked. Total clicks registered: ${count}`);
  }
}
