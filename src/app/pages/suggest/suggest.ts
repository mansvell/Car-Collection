import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {SuggestionService} from '../../api/suggestion.service';

@Component({
  selector: 'app-suggest',
  imports: [
    FormsModule,
    NgForOf
  ],
  template: `
    <section class="max-w-3xl mx-auto px-5 pt-10 pb-20">

      <h1 class="text-3xl font-bold text-white text-center mb-6"> Auto vorschlägen</h1>

      <p class="text-center text-slate-300 mb-10">
        Wenn Ihr Lieblingsauto noch nicht in unserer Sammlung vertreten ist,<br>
        senden Sie uns einen Vorschlag, wir werden ihn schnellstmöglich prüfen!
      </p>

      <form (ngSubmit)="submit()" class="space-y-6 bg-slate-900/40 p-6 rounded-xl border border-slate-700/50">

        <div>
          <label class="block text-slate-200 mb-2 font-medium">Photo </label>

          <input [(ngModel)]="form.logo" name="logo" placeholder="URL der Foto eingeben"
                 accept="image/*"
                 class="w-full text-sm bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <div>
          <label class="block text-slate-200 mb-2 font-medium"> Model</label>
          <input [(ngModel)]="form.modelName" name="modelName" required
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 focus:ring-2 focus:ring-cyan-400 text-slate-300"/>
        </div>

        <div>
          <label class="block text-slate-200 mb-2 font-medium">Marke</label>
          <input [(ngModel)]="form.brandName" name="brandName" required
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 focus:ring-2 focus:ring-cyan-400 text-slate-300"/>
        </div>

        <div>
          <label class="block text-slate-200 mb-2 font-medium">Jahr</label>
          <input type="number" [(ngModel)]="form.year" name="year" required
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 focus:ring-2 focus:ring-cyan-400 text-slate-300"/>
        </div>

        <div>
          <label class="block text-slate-200 mb-2 font-medium">Kategorie</label>

          <select [(ngModel)]="form.category" name="category" required
                  class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300">
            <option value="" disabled selected>Kategorie wählen</option>
            <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
          </select>
        </div>

        <div>
          <label class="text-slate-200 mb-1 block">Mächtigkeit (HP)</label>
          <input type="number"
                 class="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700" />
        </div>

        <div>
          <label class="block text-slate-200 mb-2 font-medium">Beschreibung</label>
          <textarea [(ngModel)]="form.description" name="description" rows="3"
                    class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"></textarea>
        </div>

        <div>
          <label class="block text-slate-200 mb-2 font-medium">Ihr Name (Optionnal)</label>
          <input [(ngModel)]="form.userName" name="userName"
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <button type="submit" class="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wide transition duration-150">
          Envoyer la suggestion
        </button>

      </form>

      <!-- SUCCESS MESSAGE -->
      <div *ngIf="submitted" class="text-center mt-8 text-green-400 font-semibold">
        Votre suggestion a été envoyée ✔️
      </div>

    </section>
  `,
  styles: ``,
  standalone: true
})
export class Suggest {
  form: any = {
    modelName: '',
    brandName: '',
    year: '',
    category: '',
    description: '',
    userName: '',
    userEmail: ''
  };

  submitted = false;

  categories = [
    'SUV', 'COUPE', 'CABRIOLET', 'SUPERCAR', 'HYPERCAR', 'CLASSIC', 'COLLECTION'
  ];

  constructor(private suggestionService: SuggestionService) {}

  submit() {
    this.form.userId = Number(localStorage.getItem('userId'));

    this.suggestionService.sendSuggestion(this.form).subscribe({
      next: () => this.submitted = true
    });
  }
  /*selectedFile: File | null = null;
  submitted = false;

  categories = [
    'SUV', 'COUPE', 'CABRIOLET', 'SUPERCAR', 'HYPERCAR', 'CLASSIC', 'COLLECTION'
  ];

  constructor(private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  submit() {
    // Pour l’instant on simule l’envoi
    this.submitted = true;

    // Plus tard → envoyer au backend via un vrai service REST
    console.log('Suggestion envoyée : ', this.form, this.selectedFile);
  }*/
}
