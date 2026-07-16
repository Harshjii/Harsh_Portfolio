import { StorageManager } from './storage.js';
import {
    initSmoothScrolling,
    initScrollSpy,
    initTypingAnimation,
    initScrollReveal,
    initResumeDownload,
    initContactForm,
    initCounters,
    initProjectTracker
} from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    // Initialize UI animations and event listeners
    initSmoothScrolling();
    initScrollSpy();
    initTypingAnimation();
    initScrollReveal();
    initResumeDownload();
    initContactForm(StorageManager);
    initCounters();

    // Initialize metrics tracking
    initProjectTracker(StorageManager);
});
