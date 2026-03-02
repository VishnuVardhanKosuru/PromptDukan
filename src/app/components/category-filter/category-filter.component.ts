import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="categories" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin: 20px 0 40px; position: relative; z-index: 10;">
      <button 
        *ngFor="let cat of categories" 
        class="glossy-btn-outline" 
        [class.active]="cat === selectedCategory"
        [style.background]="cat === selectedCategory ? 'rgba(255, 255, 255, 0.15)' : ''"
        [style.borderColor]="cat === selectedCategory ? 'white' : ''"
        [style.color]="cat === selectedCategory ? 'white' : 'var(--text-muted)'"
        (click)="selectCategory(cat)">
        {{cat}}
      </button>
    </div>
  `
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string = 'All';
  @Output() categorySelect = new EventEmitter<string>();

  selectCategory(cat: string) {
    this.categorySelect.emit(cat);
  }
}
