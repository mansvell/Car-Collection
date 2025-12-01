import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-admin-entscheidung',
  imports: [
    NgForOf
  ],
  template: `
    <section class="pt-28 pb-20 px-6 max-w-7xl mx-auto">


      <h1 class="text-3xl font-bold text-white tracking-wide mb-10 animate-fadeIn">
        Vorschläge von Benutzern
      </h1>


      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div *ngFor="let sug of suggestions"
             class="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4
                    hover:scale-[1.02] hover:shadow-xl transition duration-200 shadow-md animate-fadeUp">

          <img [src]="sug.image"
               class="h-48 w-full object-cover rounded-xl mb-4"/>

          <h2 class="text-white text-xl font-semibold">{{ sug.model }}</h2>
          <p class="text-slate-400 text-sm mb-2">{{ sug.brand }}</p>
          <p class="text-slate-500 text-sm mb-4">{{ sug.year }}</p>

          <div class="flex gap-4 mt-4">
            <button class="flex-1 py-2 bg-green-500/80 hover:bg-green-400
                           text-black rounded-xl font-semibold transition">
              zusagen
            </button>

            <button class="flex-1 py-2 bg-red-500/80 hover:bg-red-400
                           text-black rounded-xl font-semibold transition">
              Absagen
            </button>
          </div>

        </div>

      </div>

    </section>
  `,
  standalone: true,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn 0.7s ease forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeUp {
      animation: fadeUp 0.7s ease forwards;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class AdminEntscheidung {
  suggestions = [
    {
      id: 1,
      model: "Ferrari Testarossa",
      brand: "Ferrari",
      year: 1988,
      image: "https://i.ibb.co/WnH7w30/testarossa.jpg"
    },
    {
      id: 2,
      model: "Lamborghini Diablo",
      brand: "Lamborghini",
      year: 1995,
      image: "https://i.ibb.co/YX9z1MY/diablo.jpg"
    },
    {
      id: 3,
      model: "Porsche 959",
      brand: "Porsche",
      year: 1986,
      image: "https://i.ibb.co/r07K9GZ/959.jpg"
    }
  ];
}
