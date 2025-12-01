import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <section class="pt-28 pb-20 px-6 max-w-7xl mx-auto">

      <h1 class="text-3xl font-bold text-white tracking-wide mb-10 animate-fadeIn">
        Admin Dashboard
      </h1>


      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

        <div *ngFor="let stat of stats"
             class="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 shadow-lg
                    hover:scale-[1.03] transition duration-200 animate-fadeUp">

          <div class="text-4xl mb-4">
            {{ stat.icon }}
          </div>

          <div class="text-slate-300 text-sm uppercase tracking-wide mb-1">
            {{ stat.label }}
          </div>

          <div class="text-white text-2xl font-semibold">
            {{ stat.value }}
          </div>
        </div>

      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div class="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 shadow-xl animate-fadeUp">
          <h2 class="text-xl text-white font-semibold mb-4">schneller Überblick</h2>

          <ul class="space-y-3 text-slate-300">
            <li>• letztes hinzugefügtes Auto : <span class="text-cyan-400">Ferrari F8 Tributo</span></li>
            <li>• Vorschläge in Warteschlange : <span class="text-yellow-400">3</span></li>
            <li>• gesamte verfügbare Autos : <span class="text-green-400">28</span></li>
            <li>• letzte Verbindung als Admin : <span class="text-slate-400">vor 2 Stunden</span></li>
          </ul>
        </div>


        <!-- Quick Actions -->
        <div class="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 shadow-xl animate-fadeUp">
          <h2 class="text-xl text-white font-semibold mb-6">Schnelle Aktionen</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <button routerLink="/admin/cars/new" class="py-3 bg-cyan-500/80 hover:bg-cyan-400 rounded-xl text-black font-semibold transition">
              ➕ Neues Auto
            </button>

            <button routerLink="/admin/cars" class="py-3 bg-blue-500/80 hover:bg-blue-400 rounded-xl text-black font-semibold transition">
              📄 Alle Autos ansehen
            </button>

            <button routerLink="/admin/cars/adminentschd" class="py-3 bg-yellow-500/80 hover:bg-yellow-400 rounded-xl text-black font-semibold transition">
              ⭐ Entscheidung
            </button>

            <button routerLink="/admin/logout" class="py-3 bg-red-500/80 hover:bg-red-400 rounded-xl text-black font-semibold transition">
              🔒 Sich ausloggen
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
export class AdminDashboard {

  // PURE UI DATA (mock)
  stats = [
    { label: 'gesamte Autos', value: '28', icon: '🚗' },
    { label: 'Marken', value: '8', icon: '🏎️' },
    { label: 'Vorschläge', value: '3', icon: '⭐' },
    { label: 'Aktive Admins', value: '1', icon: '👤' }
  ];

}
