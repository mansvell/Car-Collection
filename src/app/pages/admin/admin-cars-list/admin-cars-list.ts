import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-cars-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `

    <section class="pt-28 pb-20 px-6 max-w-7xl mx-auto">

      <div class="flex items-center justify-between mb-10 animate-fadeIn">
        <h1 class="text-3xl font-bold text-white">Autolist</h1>

        <button routerLink="/admin/cars/new" class="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-xl
                       text-black font-semibold shadow transition">
          ➕ Neues Auto
        </button>
      </div>


      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div *ngFor="let car of cars"
             class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-4 shadow-lg
                    hover:scale-[1.03] transition animate-fadeUp">

          <img [src]="car.image"
               class="h-40 w-full object-cover rounded-lg mb-4" />

          <h3 class="text-xl font-semibold text-white mb-1">
            {{ car.model }}
          </h3>

          <p class="text-slate-400 text-sm mb-4">
            {{ car.year }} • {{ car.category }} • {{ car.hp }} ch
          </p>

          <div class="flex gap-3">

            <button class="flex-1 py-2 rounded-lg bg-blue-500/70 hover:bg-blue-400
                           text-black font-semibold transition">
              ✏️ Bearbeiten
            </button>

            <button class="flex-1 py-2 rounded-lg bg-red-500/70 hover:bg-red-400
                           text-black font-semibold transition">
              🗑️ löschen
            </button>

          </div>

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
export class AdminCarsList {

  // STATIC UI DATA (just for design)
  cars = [
    { model: 'LaFerrari', year: 2015, hp: 950, category: 'HYPERCAR', image: 'https://i.ibb.co/vdkcYSt/laferrari.jpg' },
    { model: 'F8 Tributo', year: 2021, hp: 710, category: 'SUPERCAR', image: 'https://i.ibb.co/6X7cLZD/tribu.jpg' },
    { model: 'Chiron', year: 2020, hp: 1500, category: 'HYPERCAR', image: 'https://i.ibb.co/ZmNYt8n/chiron.jpg' }
  ];
}
