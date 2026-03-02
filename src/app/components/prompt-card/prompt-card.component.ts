import { Component, Input } from '@angular/core';
import { Prompt } from '../../services/prompt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prompt-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card" style="height: 100%; display: flex; flex-direction: column; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: var(--primary-color); opacity: 0.15; filter: blur(30px); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -50px; left: -50px; width: 100px; height: 100px; background: var(--secondary-color); opacity: 0.1; filter: blur(30px); border-radius: 50%;"></div>

      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; z-index: 1;">
         <div style="display: flex; gap: 8px; flex-wrap: wrap;">
           <span style="font-size: 0.75rem; background: rgba(255, 69, 0, 0.15); color: #cbd5e1; padding: 6px 12px; border-radius: 20px; border: 1px solid rgba(255, 69, 0, 0.3);">{{prompt.category}}</span>
           <span style="font-size: 0.75rem; background: rgba(255, 255, 255, 0.05); color: white; padding: 6px 12px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1);">🤖 {{prompt.aiModel}}</span>
         </div>
         <span style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 5px;">
           <span style="color: var(--secondary-color); font-size: 1.1rem;">♥</span> {{prompt.likes}}
         </span>
      </div>
      <h3 style="font-size: 1.3rem; margin-bottom: 12px; font-weight: 600; z-index: 1; line-height: 1.3;">{{prompt.title}}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 25px; flex-grow: 1; z-index: 1; line-height: 1.5;">{{prompt.description}}</p>
      
      <div class="prompt-content" style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 12px; margin-bottom: 25px; font-family: 'Courier New', monospace; font-size: 0.85rem; color: #94a3b8; max-height: 120px; overflow-y: auto; z-index: 1; border: 1px solid rgba(255,255,255,0.05); text-wrap: wrap;">
        {{prompt.content}}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 1; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05);">
        <div style="display: flex; align-items: center; gap: 8px;">
           <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: bold;">AI</div>
           <span style="font-size: 0.8rem; color: var(--text-muted);">{{prompt.authorAgent}}</span>
        </div>
        <button class="glossy-btn-outline" (click)="copyToClipboard()" style="padding: 8px 16px; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
          <svg *ngIf="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <svg *ngIf="copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          {{ copied ? 'Copied!' : 'Copy Prompt' }}
        </button>
      </div>
    </div>
  `
})
export class PromptCardComponent {
  @Input() prompt!: Prompt;
  copied = false;

  copyToClipboard() {
    navigator.clipboard.writeText(this.prompt.content).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }
}
