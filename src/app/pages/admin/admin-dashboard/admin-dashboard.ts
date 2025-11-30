import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <section class="pt-28 pb-20 px-6 max-w-7xl mx-auto">

      <!-- TITLE -->
      <h1 class="text-3xl font-bold text-white tracking-wide mb-10 animate-fadeIn">
        Admin Dashboard
      </h1>


      <!-- STATS CARDS -->
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


      <!-- QUICK OVERVIEW + ACTIONS -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <!-- Quick Overview -->
        <div class="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 shadow-xl animate-fadeUp">
          <h2 class="text-xl text-white font-semibold mb-4">Aperçu rapide</h2>

          <ul class="space-y-3 text-slate-300">
            <li>• Dernière voiture ajoutée : <span class="text-cyan-400">Ferrari F8 Tributo</span></li>
            <li>• Suggestions en attente : <span class="text-yellow-400">3</span></li>
            <li>• Total de voitures enregistrées : <span class="text-green-400">28</span></li>
            <li>• Dernière connexion admin : <span class="text-slate-400">il y a 2 heures</span></li>
          </ul>
        </div>


        <!-- Quick Actions -->
        <div class="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 shadow-xl animate-fadeUp">
          <h2 class="text-xl text-white font-semibold mb-6">Actions rapides</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <button routerLink="/admin/cars/new" class="py-3 bg-cyan-500/80 hover:bg-cyan-400 rounded-xl text-black font-semibold transition">
              ➕ Nouvelle voiture
            </button>

            <button routerLink="/admin/cars" class="py-3 bg-blue-500/80 hover:bg-blue-400 rounded-xl text-black font-semibold transition">
              📄 Voir toutes les voitures
            </button>

            <button routerLink="/admin/suggestadmin" class="py-3 bg-yellow-500/80 hover:bg-yellow-400 rounded-xl text-black font-semibold transition">
              ⭐ Suggestions
            </button>

            <button class="py-3 bg-red-500/80 hover:bg-red-400 rounded-xl text-black font-semibold transition">
              🔒 Se déconnecter
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
    { label: 'Total Voitures', value: '28', icon: '🚗' },
    { label: 'Marques', value: '8', icon: '🏎️' },
    { label: 'Suggestions', value: '3', icon: '⭐' },
    { label: 'Admins actifs', value: '1', icon: '👤' }
  ];

}
