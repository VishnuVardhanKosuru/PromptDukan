import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submit-prompt-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="modal-content glass-panel" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close()">&times;</button>
        
        <div *ngIf="!submitted">
          <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Submit a Prompt
          </h2>
          <p style="color: var(--text-muted); margin-bottom: 30px; font-size: 0.95rem;">
            Share your best AI prompt with the community. All submissions are reviewed before publishing.
          </p>

          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Your Name *</label>
              <input type="text" [(ngModel)]="formData.name" name="name" placeholder="John Doe" required>
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input type="email" [(ngModel)]="formData.email" name="email" placeholder="john@example.com" required>
            </div>
            <div class="form-group">
              <label>Prompt Title *</label>
              <input type="text" [(ngModel)]="formData.promptTitle" name="promptTitle" placeholder="e.g. Advanced Code Reviewer" required>
            </div>
            <div class="form-group">
              <label>AI Tool *</label>
              <select [(ngModel)]="formData.aiTool" name="aiTool" required>
                <option value="" disabled>Select an AI tool</option>
                <option *ngFor="let tool of aiTools" [value]="tool">{{tool}}</option>
              </select>
              <input *ngIf="formData.aiTool === 'Other'" type="text" [(ngModel)]="formData.customTool" name="customTool" placeholder="Enter the AI tool name" style="margin-top: 10px;">
            </div>
            <div class="form-group">
              <label>Prompt Content *</label>
              <textarea [(ngModel)]="formData.promptContent" name="promptContent" rows="5" placeholder="Write your full prompt here..." required></textarea>
            </div>
            <button type="submit" class="glossy-btn submit-btn" [disabled]="submitting">
              {{ submitting ? 'Submitting...' : '✨ Submit Prompt' }}
            </button>
          </form>
        </div>

        <div *ngIf="submitted" class="success-state">
          <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
          <h2 style="font-size: 1.5rem; margin-bottom: 12px;">Prompt Submitted!</h2>
          <p style="color: var(--text-muted); margin-bottom: 25px;">Thank you for contributing to the PromptDukan community. Your prompt will be reviewed and added soon.</p>
          <button class="glossy-btn" (click)="close()">Close</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; animation: fadeIn 0.3s ease;
    }
    .modal-content {
      width: 90%; max-width: 550px; max-height: 90vh; overflow-y: auto;
      padding: 40px; border-radius: 24px; position: relative;
      animation: slideUp 0.3s ease;
    }
    .close-btn {
      position: absolute; top: 16px; right: 20px;
      background: none; border: none; color: var(--text-muted);
      font-size: 2rem; cursor: pointer; transition: color 0.2s;
      line-height: 1;
    }
    .close-btn:hover { color: white; }
    .form-group { margin-bottom: 20px; }
    .form-group label {
      display: block; font-size: 0.85rem; font-weight: 600;
      color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
      color: white; font-size: 1rem; font-family: inherit;
      transition: border-color 0.3s, box-shadow 0.3s; outline: none;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(255,69,0,0.15);
    }
    .form-group select option { background: #1a1a2e; color: white; }
    .form-group textarea { resize: vertical; min-height: 100px; }
    .submit-btn { width: 100%; padding: 14px; font-size: 1.1rem; margin-top: 10px; }
    .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .success-state { text-align: center; padding: 20px 0; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class SubmitPromptModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  submitted = false;
  submitting = false;

  aiTools = [
    'ChatGPT', 'Claude', 'Gemini', 'Cursor AI', 'GitHub Copilot',
    'Groq', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Runway ML',
    'ElevenLabs', 'Hugging Face', 'n8n', 'Zapier', 'Figma AI', 'Other'
  ];

  formData = {
    name: '',
    email: '',
    promptTitle: '',
    aiTool: '',
    customTool: '',
    promptContent: ''
  };

  close() {
    this.isOpen = false;
    this.submitted = false;
    this.closeModal.emit();
  }

  onOverlayClick(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  async onSubmit() {
    if (this.submitting) return;
    this.submitting = true;

    const tool = this.formData.aiTool === 'Other' ? this.formData.customTool : this.formData.aiTool;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '714175d7-cdb1-4361-b725-795f92f26c32',
          subject: `New Prompt Submission: ${this.formData.promptTitle}`,
          from_name: this.formData.name,
          email: this.formData.email,
          'Prompt Title': this.formData.promptTitle,
          'AI Tool': tool,
          'Prompt Content': this.formData.promptContent,
        })
      });

      const data = await response.json();
      if (data.success) {
        this.submitted = true;
      } else {
        alert('Submission failed: ' + (data.message || 'Please try again.'));
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
    }

    this.submitting = false;
    this.formData = { name: '', email: '', promptTitle: '', aiTool: '', customTool: '', promptContent: '' };
  }
}
