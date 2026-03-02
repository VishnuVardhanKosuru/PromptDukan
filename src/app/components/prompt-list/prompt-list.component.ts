import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prompt } from '../../services/prompt.service';
import { PromptCardComponent } from '../prompt-card/prompt-card.component';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, PromptCardComponent],
  template: `
    <div class="prompt-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; padding: 20px; max-width: 1200px; margin: 0 auto; padding-bottom: 100px; position: relative; z-index: 10;">
      <app-prompt-card *ngFor="let prompt of prompts" [prompt]="prompt"></app-prompt-card>
      
      <div *ngIf="prompts.length === 0" class="glass-panel" style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 80px 20px; border-radius: 20px;">
        <div style="font-size: 3rem; margin-bottom: 20px;">🔍</div>
        <h3 style="font-size: 1.5rem; color: white; margin-bottom: 10px;">No prompts found</h3>
        <p style="margin-bottom: 25px;">Can't find what you're looking for? Submit your own prompt to the community!</p>
        <button class="glossy-btn" (click)="onSubmitPrompt()" style="padding: 12px 28px; font-size: 1rem;">
          ✨ Submit a Prompt
        </button>
      </div>
    </div>
  `
})
export class PromptListComponent {
  @Input() prompts: Prompt[] = [];
  @Output() submitPromptClick = new EventEmitter<void>();

  onSubmitPrompt() {
    this.submitPromptClick.emit();
  }
}
