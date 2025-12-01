import { Component } from '@angular/core';

@Component({
  selector: 'app-car-details',
  standalone: true,
  template: `

    <section class="pt-28 pb-20 px-6 max-w-5xl mx-auto animate-fadeIn">

      <div class="w-full rounded-2xl overflow-hidden shadow-xl mb-10">
        <img src="https://i.ibb.co/vdkcYSt/laferrari.jpg"
             class="w-full h-[400px] object-cover" />
      </div>

      <h1 class="text-4xl font-bold text-white mb-4">Ferrari LaFerrari</h1>
      <p class="text-slate-300 mb-6">
        2015 • 950 ch • Hypercar • Ferrari
      </p>

      <p class="text-slate-400 leading-relaxed mb-10">
        La Ferrari est un modèle emblématique, combinant élégance, puissance
        et technologie hybride de pointe. Produite à seulement 499 exemplaires,
        elle représente l'apogée du savoir-faire Ferrari.
      </p>


      <button class="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black
                     font-semibold rounded-xl shadow-lg transition">
        zu Favorite hinzufügen
      </button>

    </section>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn .7s ease forwards;
    }
    @keyframes fadeIn {
      from {opacity:0; transform:translateY(20px);}
      to   {opacity:1; transform:translateY(0);}
    }
  `]
})
export class CarDetail {

}
