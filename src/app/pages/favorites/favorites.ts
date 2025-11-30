import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="pt-24 pb-20 px-5 max-w-6xl mx-auto">


      <h1 class="text-center text-3xl font-bold text-white tracking-wide mb-10 animate-fadeIn">
        Hier finden Sie alle Modele ,die Ihnen gut gefallen haben❤️
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div *ngFor="let car of favoriteCars"
             class="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4
                    hover:scale-[1.03] hover:shadow-xl transition duration-200 shadow-md animate-fadeUp">

          <img [src]="car.image"
               class="h-48 w-full object-cover rounded-xl mb-4" />

          <div class="text-white text-xl font-semibold mb-1">
            {{ car.model }}
          </div>

          <div class="text-slate-400 text-sm mb-4">
            {{ car.year }} • {{ car.hp }} ch
          </div>

          <button class="w-full py-2 rounded-xl bg-red-500/80 hover:bg-red-400 cursor-pointer
                         text-black font-semibold shadow transition">
            entfernen
          </button>

        </div>

      </div>

    </section>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn 0.7s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .animate-fadeUp {
      animation: fadeUp 0.7s ease forwards;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class Favorites {

  // PURE FRONTEND — static sample data
  favoriteCars = [
    { model: 'LaFerrari', year: 2015, hp: 950, image: 'https://i.ibb.co/vdkcYSt/laferrari.jpg' },
    { model: 'F8 Tributo', year: 2021, hp: 710, image: 'https://i.ibb.co/6X7cLZD/tribu.jpg' },
    { model: 'Chiron', year: 2020, hp: 1500, image: 'https://i.ibb.co/ZmNYt8n/chiron.jpg' }
  ];
}

