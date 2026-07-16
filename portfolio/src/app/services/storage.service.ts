import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Save contact message to localStorage.
   * @param message - The message details containing name, email, and body.
   * @returns Success status.
   */
  saveMessage(message: { name: string; email: string; message: string }): boolean {
    if (!this.isBrowser) return false;
    try {
      const messages = this.getMessages();
      messages.push({
        ...message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("portfolio_contact_messages", JSON.stringify(messages));
      return true;
    } catch (e) {
      console.error("Error saving message to localStorage:", e);
      return false;
    }
  }

  /**
   * Retrieve all saved messages from localStorage.
   * @returns List of saved messages.
   */
  getMessages(): any[] {
    if (!this.isBrowser) return [];
    try {
      const data = localStorage.getItem("portfolio_contact_messages");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading messages from localStorage:", e);
      return [];
    }
  }

  /**
   * Increment and track click count for a project.
   * @param projectId - The project name or ID.
   * @returns Updated click count.
   */
  trackProjectClick(projectId: string): number {
    if (!this.isBrowser) return 0;
    try {
      const clicks = this.getProjectClicks();
      clicks[projectId] = (clicks[projectId] || 0) + 1;
      localStorage.setItem("portfolio_project_clicks", JSON.stringify(clicks));
      return clicks[projectId];
    } catch (e) {
      console.error("Error tracking project click in localStorage:", e);
      return 0;
    }
  }

  /**
   * Retrieve all project click metrics.
   * @returns Map of project click counts.
   */
  getProjectClicks(): any {
    if (!this.isBrowser) return {};
    try {
      const data = localStorage.getItem("portfolio_project_clicks");
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Error reading project clicks from localStorage:", e);
      return {};
    }
  }
}
