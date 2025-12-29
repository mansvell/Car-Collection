import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { SuggestionService } from '../../api/suggestion.service';

@Component({
  selector: 'app-suggest',
  imports: [FormsModule, NgForOf, NgIf],
  template: `
    <div class=" bg-gradient-to-b via-slate-500 to-slate-10">
      <section class="max-w-3xl mx-auto px-5 pt-2 pb-20 animate-page-enter ">

      <div class="text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2
                    ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
          <span class="h-2 w-2 rounded-full bg-sky-500"></span>
          <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Vorschlag</span>
          <span class="text-xs font-black text-red-500">•</span>
          <span class="text-xs font-semibold text-slate-500">Auto Suggestion</span>
        </div>

        <div class ="flex items-center ">
          <h1 class="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Auto <span class="text-sky-600">vorschlagen</span>
          </h1>

          <p class="mt-3 text-slate-600 text-base sm:text-lg">
            Wenn Ihr Lieblingsauto noch nicht in unserer Sammlung vertreten ist,<br class="hidden sm:block">
            senden Sie uns einen Vorschlag — wir prüfen ihn schnellstmöglich.
          </p>
        </div>

      </div>

      <form (ngSubmit)="submit()"
            class="mt-10 space-y-6 rounded-3xl bg-white/70 backdrop-blur-xl
                   ring-1 ring-slate-200/70 shadow-[0_20px_60px_-35px_rgba(2,6,23,0.35)]
                   p-6 sm:p-8">

        <div class="space-y-2">
          <label class="block text-slate-700 font-extrabold">Photo (URL)</label>
          <input [(ngModel)]="form.logo" name="logo" placeholder="https://…"
                 class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                        placeholder:text-slate-400 shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white
                        transition" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-slate-700 font-extrabold">Model</label>
            <input [(ngModel)]="form.modelName" name="modelName" required
                   placeholder="z.b: class G63 "
                   class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                          placeholder:text-slate-400 shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white
                          transition" />
          </div>

          <div class="space-y-2">
            <label class="block text-slate-700 font-extrabold">Marke</label>
            <input [(ngModel)]="form.brandName" name="brandName" required
                   placeholder="zb: Porsche"
                   class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                          placeholder:text-slate-400 shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white
                          transition" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-slate-700 font-extrabold">Preis</label>
            <input type="number" [(ngModel)]="form.year" name="year" required
                   placeholder="zb: 250100"
                   class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                          placeholder:text-slate-400 shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white
                          transition" />
          </div>

          <div class="space-y-2">
            <label class="block text-slate-700 font-extrabold">Leistung (HP)</label>
            <input type="number" [(ngModel)]="form.hp" name="hp"
                   placeholder="ex: 510"
                   class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                          placeholder:text-slate-400 shadow-sm
                          focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white
                          transition" />
          </div>
        </div>

        <!-- Category -->
        <div class="space-y-2">
          <label class="block text-slate-700 font-extrabold">Kategorie</label>
          <select [(ngModel)]="form.category" name="category" required
                  class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                         shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white
                         transition">
            <option value="" disabled>Kategorie wählen</option>
            <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
          </select>
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <label class="block text-slate-700 font-extrabold">Beschreibung</label>
          <textarea [(ngModel)]="form.description" name="description" rows="4"
                    placeholder="Warum dieses Auto in die Collection gehört…"
                    class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                           placeholder:text-slate-400 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white
                           transition"></textarea>
        </div>

        <!-- Submit -->
        <button type="submit"
                class="w-full py-3.5 rounded-2xl font-extrabold tracking-wide text-white
                       bg-gradient-to-r from-sky-500 via-sky-600 to-red-500
                       shadow-lg shadow-sky-500/20
                       transition duration-200
                       hover:brightness-110 hover:-translate-y-0.5
                       active:translate-y-0 active:scale-[0.99]">
          Vorschlag senden
        </button>

        <!-- Success -->
        <div *ngIf="submitted"
             class="rounded-2xl bg-white/70 ring-1 ring-emerald-200/70 p-4 text-center animate-pop">
          <div class="font-extrabold text-emerald-700">Ihr Vorschla wurde erfolgreich gesendet</div>
          <div class="text-sm text-slate-600 mt-1">Danke! Wir werden ihn so schnell wie möglich behandeln</div>
        </div>

      </form>
     </section>
    </div>
  `,
  styles: [`
    @keyframes pageEnter {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-page-enter {
      animation: pageEnter 420ms cubic-bezier(.16,1,.3,1) both;
    }

    @keyframes pop {
      0% { opacity: 0; transform: translateY(10px) scale(.96); }
      70% { opacity: 1; transform: translateY(0) scale(1.02); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-pop {
      animation: pop 360ms cubic-bezier(.16,1,.3,1) both;
    }
  `],
  standalone: true
})
export class Suggest {
  form: any = {
    logo: '',
    modelName: '',
    brandName: '',
    year: '',
    hp: '',
    category: '',
    description: '',
    userName: '',
    userEmail: ''
  };

  submitted = false;

  categories = [
    'SUV', 'COUPE', 'LUXUSLIMOUSINE', 'CABRIOLET', 'SUPERCAR', 'HYPERCAR', 'CLASSIC', 'COLLECTION', 'SPORTCAR'
  ];

  constructor(private suggestionService: SuggestionService) {}

  submit() {
    this.form.userId = Number(localStorage.getItem('userId'));
    this.suggestionService.sendSuggestion(this.form).subscribe({
      next: () => this.submitted = true
    });
  }
}
