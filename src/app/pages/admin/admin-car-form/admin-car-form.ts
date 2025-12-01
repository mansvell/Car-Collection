import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-car-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `

    <section class="pt-28 pb-20 px-6 max-w-4xl mx-auto">

      <h1 class="text-3xl font-bold text-white tracking-wide mb-10 animate-fadeIn">
        Auto hinzufügen/editieren
      </h1>

      <div class="bg-slate-800/50 border border-slate-700/40 p-8 rounded-2xl shadow-xl animate-fadeUp">

        <form class="space-y-6">

          <div>
            <label class="text-slate-200 mb-1 block">Photo</label>
            <input type="file"
                   class="w-full p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700" />
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Model</label>
            <input class="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700" />
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Marke</label>
            <input class="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700" />
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Jahr</label>
            <input type="number"
                   class="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700" />
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Mächtigkeit (HP)</label>
            <input type="number"
                   class="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700" />
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Kategorie</label>

            <select class="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700">
              <option disabled selected>Kategorie wählen</option>
              <option>SUV</option>
              <option>COUPE</option>
              <option>CABRIOLET</option>
              <option>SUPERCAR</option>
              <option>HYPERCAR</option>
              <option>CLASSIC</option>
              <option>COLLECTION</option>
            </select>
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Beschreibung</label>
            <textarea rows="3"
                      class="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700"></textarea>
          </div>

          <button type="button"
                  class="w-full py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-black font-semibold shadow-xl transition">
            Speichern
          </button>

        </form>

      </div>

    </section>
  `,
  styles: [`
    .animate-fadeIn { animation: fadeIn 0.7s ease forwards; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(-10px);} to{opacity:1;transform:translateY(0);} }

    .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
  `]
})
export class AdminCarForm {}
