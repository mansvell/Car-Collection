import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="pt-24 pb-20 px-5 max-w-6xl mx-auto">

      <div class="w-full flex justify-center mb-14 animate-fadeIn">
        <img [src]="selectedBrand?.logo" [alt]="selectedBrand?.name" class="h-28 opacity-90 drop-shadow-xl" />
      </div>

      <h1 class="text-center text-4xl font-bold text-white tracking-wide mb-16 animate-fadeIn">
        {{ selectedBrand?.name }}
      </h1>

      <!-- Catégories -->
      <div class="space-y-20">

        <div *ngFor="let category of categoryKeys" class="animate-fadeUp">

          <!-- Titre catégorie -->
          <h2 class="text-2xl font-semibold text-slate-200 mb-4">
            {{ category }}
          </h2>

          <!-- Carrousel Horizontal -->
          <div class="flex gap-6 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-700">

            <!-- CARDS -->
            <div
              *ngFor="let car of carsFiltered[category]"
              class="min-w-[280px] max-w-[280px] bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4
                     hover:scale-[1.05] hover:shadow-2xl transition duration-200 cursor-pointer shadow-md">

              <img [src]="car.image"
                   class="h-40 w-full object-cover rounded-lg mb-4" />

              <div class="text-white font-semibold text-lg mb-1">
                {{ car.model }}
              </div>

              <div class="text-slate-400 text-sm mb-1">
                {{ car.year }} • {{ car.hp }} ch
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  `,
  styles: [`
    /* Animations */
    .animate-fadeIn {
      animation: fadeIn 0.8s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .animate-fadeUp {
      animation: fadeUp 0.8s ease forwards;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /*Scroll horizontal */
    .scrollbar-thin::-webkit-scrollbar {
      height: 6px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: #475569;
      border-radius: 999px;
    }
  `]
})
export class Brand {

  selectedBrand: any = null;
  categoryKeys: string[] = [];
  carsFiltered: any = {};

  constructor(private route: ActivatedRoute) {}

  brands = [
    { id: 1, name: 'Ferrari', logo: 'https://i.ibb.co/hK5kVWK/ferrari.png' },
    { id: 2, name: 'Lamborghini', logo: 'https://i.ibb.co/5KXG8gd/lamborghini.png' },
    { id: 3, name: 'Porsche', logo: 'https://i.ibb.co/vQJgn2M/porsche.png' },
    { id: 4, name: 'Bugatti', logo: 'https://i.ibb.co/3rqxGxN/bugatti.png' }
  ];

  cars = [
    // FERRARI = id 1
    { brandId: 1, category: 'SUPERCAR', model: '488 GTB', year: 2019, hp: 670, image: 'https://i.ibb.co/9VJ6zBM/ferrari-car.jpg' },
    { brandId: 1, category: 'SUPERCAR', model: 'F8 Tributo', year: 2021, hp: 710, image: 'https://i.ibb.co/6X7cLZD/tribu.jpg' },
    { brandId: 1, category: 'HYPERCAR', model: 'LaFerrari', year: 2015, hp: 950, image: 'https://i.ibb.co/vdkcYSt/laferrari.jpg' },
    { brandId: 1, category: 'CLASSIC', model: '250 GTO', year: 1962, hp: 300, image: 'https://i.ibb.co/LxmdHNj/250gto.jpg' },

    // LAMBORGHINI = id 2
    { brandId: 2, category: 'SUPERCAR', model: 'Huracán EVO', year: 2020, hp: 640, image: 'https://i.ibb.co/0Qcpf8H/huracan.jpg' },
    { brandId: 2, category: 'HYPERCAR', model: 'Sián', year: 2021, hp: 808, image: 'https://i.ibb.co/ZJxpb2c/sian.jpg' },

    // BUGATTI = id 4
    { brandId: 4, category: 'SUPERCAR', model: 'Chiron', year: 2020, hp: 1500, image: 'https://i.ibb.co/ZmNYt8n/chiron.jpg' },
    { brandId: 4, category: 'HYPERCAR', model: 'Divo', year: 2022, hp: 1500, image: 'https://i.ibb.co/1mWmmX3/divo.jpg' }
  ];

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedBrand = this.brands.find(b => b.id === id);

    this.categoryKeys = ['SUPERCAR', 'HYPERCAR', 'CLASSIC', 'COUPE', 'CABRIOLET', 'SUV', 'COLLECTION'];

    // INITIALISATION DES CATEGORIES VIDES
    this.categoryKeys.forEach(cat => this.carsFiltered[cat] = []);

    // FILTRAGE PAR MARQUE
    this.cars
      .filter(c => c.brandId === id)
      .forEach(c => this.carsFiltered[c.category].push(c));
  }
}
