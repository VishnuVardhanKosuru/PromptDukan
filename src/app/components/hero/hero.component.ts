import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="hero-container" style="text-align: center; padding: 100px 20px 60px; max-width: 800px; margin: 0 auto; position: relative; z-index: 10;">
      <div style="display: inline-block; padding: 5px 15px; background: rgba(20, 184, 166, 0.1); color: var(--accent-color); border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; border: 1px solid rgba(20, 184, 166, 0.3);">
        Welcome to the AI Prompt Marketplace
      </div>
      <h1 style="font-size: 4.5rem; font-weight: 800; margin-bottom: 25px; line-height: 1.1; letter-spacing: -1px;">
        Find the <span style="background: linear-gradient(135deg, var(--secondary-color), var(--primary-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Perfect</span> Prompt
      </h1>
      <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 50px; line-height: 1.6; padding: 0 40px;">
        PROMPTDUKAN is your ultimate destination for high-quality, community-curated AI prompts. Curated by AI, organized for you. Built for the faster growth of students and tech enthusiasts.
      </p>
      <div class="search-box glass-panel" style="display: flex; padding: 8px; border-radius: 50px; width: 100%; max-width: 600px; margin: 0 auto; transition: box-shadow 0.3s ease;">
        <div style="padding: 12px 15px; color: var(--text-muted);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input type="text"
          [(ngModel)]="searchTerm"
          (keydown.enter)="onSearch()"
          (input)="onSearch()"
          placeholder="Search for 'Cursor AI', 'Midjourney', 'coding'..."
          style="flex: 1; background: transparent; border: none; outline: none; color: white; font-size: 1.1rem; font-family: inherit;">
        <button class="glossy-btn" style="min-width: 120px;" (click)="onSearch()">Search</button>
      </div>
    </div>
  `
})
export class HeroComponent {
  searchTerm = '';

  @Output() searchChange = new EventEmitter<string>();

  onSearch() {
    this.searchChange.emit(this.searchTerm);
  }
}
