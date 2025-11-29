import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-suggest',
  imports: [
    FormsModule,
    NgForOf
  ],
  template: `
    <section class="max-w-3xl mx-auto px-5 pt-10 pb-20">

      <h1 class="text-3xl font-bold text-white text-center mb-6">Suggérer une Voiture  </h1>

      <p class="text-center text-slate-300 mb-10">
        Si votre voiture préférée ne figure pas encore dans notre collection,<br>
        envoyez-nous une suggestion, elle sera examinée!
      </p>

      <form (ngSubmit)="submit()" class="space-y-6 bg-slate-900/40 p-6 rounded-xl border border-slate-700/50">
        <!-- Upload image -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Photo</label>

          <input type="file" (change)="onFileSelected($event)"
                 accept="image/*"
                 class="w-full text-sm bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <!-- Model -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Nom du modèle</label>
          <input [(ngModel)]="form.modelName" name="modelName" required
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <!-- Brand -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Marque</label>
          <input [(ngModel)]="form.brandName" name="brandName" required
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <!-- Year -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Année</label>
          <input type="number" [(ngModel)]="form.year" name="year" required
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Catégorie</label>

          <select [(ngModel)]="form.category" name="category" required
                  class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300">
            <option value="" disabled selected>Choisissez une catégorie</option>
            <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Courte description</label>
          <textarea [(ngModel)]="form.description" name="description" rows="3"
                    class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"></textarea>
        </div>

        <!-- Optional name -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Votre nom (optionnel)</label>
          <input [(ngModel)]="form.userName" name="userName"
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <!-- Optional email -->
        <div>
          <label class="block text-slate-200 mb-2 font-medium">Email (optionnel)</label>
          <input type="email" [(ngModel)]="form.userEmail" name="userEmail"
                 class="w-full bg-slate-800/60 border border-slate-700/70 rounded-lg p-2 text-slate-300"/>
        </div>

        <!-- Submit -->
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

  selectedFile: File | null = null;
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
  }
}
