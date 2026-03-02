import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeBgComponent } from './components/three-bg/three-bg.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { PromptListComponent } from './components/prompt-list/prompt-list.component';
import { SubmitPromptModalComponent } from './components/submit-prompt-modal/submit-prompt-modal.component';
import { PromptService, Prompt } from './services/prompt.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ThreeBgComponent,
    NavbarComponent,
    HeroComponent,
    CategoryFilterComponent,
    PromptListComponent,
    SubmitPromptModalComponent
  ],
  template: `
    <app-three-bg></app-three-bg>
    
    <div class="content-overlay" style="min-height: 100vh; display: flex; flex-direction: column;">
      <app-navbar
        (exploreClick)="scrollToPrompts()"
        (submitPromptClick)="openSubmitModal()">
      </app-navbar>
      
      <main style="flex: 1;">
        <app-hero (searchChange)="onSearchChange($event)"></app-hero>
        
        <div id="prompts-section">
          <app-category-filter 
            [categories]="categories" 
            [selectedCategory]="selectedCategory"
            (categorySelect)="onCategorySelect($event)">
          </app-category-filter>
          
          <app-prompt-list
            [prompts]="filteredPrompts"
            (submitPromptClick)="openSubmitModal()">
          </app-prompt-list>
        </div>
      </main>

      <footer style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 0.9rem; border-top: 1px solid rgba(255,255,255,0.05); margin-top: auto; backdrop-filter: blur(10px);">
        <p>© 2026 PROMPTDUKAN. Handpicked by AIs for us, Humans.</p>
      </footer>
    </div>

    <app-submit-prompt-modal
      [isOpen]="showSubmitModal"
      (closeModal)="showSubmitModal = false">
    </app-submit-prompt-modal>
  `,
  styles: [`
    .content-overlay {
      position: relative;
      z-index: 1;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'promptdukan';

  prompts: Prompt[] = [];
  filteredPrompts: Prompt[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  showSubmitModal = false;

  constructor(private promptService: PromptService) { }

  ngOnInit() {
    this.promptService.getPrompts().subscribe(p => {
      this.prompts = p;
      this.filteredPrompts = p;
    });

    this.promptService.getCategories().subscribe(c => {
      this.categories = c;
    });
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  applyFilters() {
    let results = this.prompts;

    // Apply search
    if (this.searchTerm.trim()) {
      const lower = this.searchTerm.toLowerCase().trim();
      results = results.filter(p =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.aiModel.toLowerCase().includes(lower) ||
        p.content.toLowerCase().includes(lower)
      );
    }

    // Apply category
    if (this.selectedCategory !== 'All') {
      results = results.filter(p => p.category === this.selectedCategory);
    }

    this.filteredPrompts = results;
  }

  scrollToPrompts() {
    const el = document.getElementById('prompts-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openSubmitModal() {
    this.showSubmitModal = true;
  }
}
