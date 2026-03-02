import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prompt } from '../data/prompt-types';
import { PROMPTS_DATA } from '../data/prompts-data';

export type { Prompt } from '../data/prompt-types';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private prompts: Prompt[] = PROMPTS_DATA;

  constructor() { }

  getPrompts(): Observable<Prompt[]> {
    return of(this.prompts);
  }

  getCategories(): Observable<string[]> {
    const categories = ['All', ...new Set(this.prompts.map(p => p.category))];
    return of(categories);
  }

  searchPrompts(term: string): Observable<Prompt[]> {
    const lower = term.toLowerCase().trim();
    if (!lower) return of(this.prompts);
    const results = this.prompts.filter(p =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.aiModel.toLowerCase().includes(lower) ||
      p.content.toLowerCase().includes(lower)
    );
    return of(results);
  }
}
