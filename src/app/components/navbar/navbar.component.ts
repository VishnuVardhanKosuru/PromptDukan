import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="glass-panel" style="margin: 20px; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 20px; z-index: 100;">
      <div class="logo" style="font-weight: 800; font-size: 1.5rem; letter-spacing: 1px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        PROMPTDUKAN
      </div>
      <div class="nav-links">
        <button class="glossy-btn-outline" style="margin-right: 15px;" (click)="onExplore()">Explore</button>
        <button class="glossy-btn" (click)="onSubmitPrompt()">Submit Prompt</button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  @Output() exploreClick = new EventEmitter<void>();
  @Output() submitPromptClick = new EventEmitter<void>();

  onExplore() {
    this.exploreClick.emit();
  }

  onSubmitPrompt() {
    this.submitPromptClick.emit();
  }
}
