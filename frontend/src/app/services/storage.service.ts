import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;
  private apiBaseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Auto-detect environment to switch between localhost and live Vercel database api
    if (this.isBrowser && window.location.hostname !== 'localhost') {
      this.apiBaseUrl = 'https://harsh-portfolio-sja2.vercel.app/api';
    } else {
      this.apiBaseUrl = 'http://localhost:5000/api';
    }
  }

  /**
   * Save contact message to MongoDB via Backend API.
   * @param message - The message details.
   * @returns Observable.
   */
  saveMessage(message: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/contact`, message);
  }

  /**
   * Increment and track click count for a project via Backend API.
   * @param projectId - The project name or ID.
   * @returns Observable.
   */
  trackProjectClick(projectId: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/metrics/click`, { projectName: projectId });
  }

  /**
   * Retrieve all project click metrics.
   * @returns Observable.
   */
  getProjectClicks(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/metrics/clicks`);
  }

  /**
   * Retrieve all projects from Backend API.
   * @returns Observable.
   */
  getProjects(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/projects`);
  }
}
