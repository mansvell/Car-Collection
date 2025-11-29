import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf
  ],
  template: `
    <section class="pt-10 pb-20 px-5 max-w-6xl mx-auto">

      <!-- Hero Section -->
      <div class="text-center mt-10 mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4">Explorez les Marques
          Automobiles</h1>
        <p class="text-slate-300 text-lg opacity-80 max-w-2xl mx-auto">
          Découvrez une collection unique de voitures de luxe, de supercars, et de modèles rares.
        </p>
      </div>

      <!-- Grille des Marques -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

        <div *ngFor="let brand of brands" (click)="goToBrand(brand.id)"
          class="cursor-pointer bg-slate-800/40 border border-slate-700/40 rounded-xl p-5 flex flex-col items-center
                 hover:bg-slate-800 hover:scale-[1.03] hover:shadow-xl transition-all duration-200">

          <img [src]="brand.logo" [alt]="brand.name" class="h-16 mb-4 opacity-90"/>
          <span class="text-white font-medium tracking-wide">{{ brand.name }}</span>
        </div>

      </div>
    </section>
  `,
  styles: ``,
  standalone: true
})
export class Home {

  constructor(private router: Router) {}

  // Marques (en dur pour l'instant)
  brands = [
    { id: 1, name: 'Ferrari', logo: 'https://i.ibb.co/hK5kVWK/ferrari.png' },
    { id: 2, name: 'Lamborghini', logo: 'https://i.ibb.co/5KXG8gd/lamborghini.png' },
    { id: 3, name: 'Porsche', logo: 'https://th.bing.com/th/id/R.b4c1d1e8b303191cca43edfcd88a1e7c?rik=qFkt7AOl4rKEmQ&pid=ImgRaw&r=0' },
    { id: 4, name: 'Bugatti', logo: 'https://i.ibb.co/3rqxGxN/bugatti.png' },
    { id: 5, name: 'Mercedes-Benz', logo: 'https://i.ibb.co/1Kj9TRb/mercedes.png' },
    { id: 6, name: 'BMW', logo: 'https://i.ibb.co/dfWwBDP/bmw.png' },
    { id: 7, name: 'McLaren', logo: 'https://i.ibb.co/Z1QnMC1/mclaren.png' },
    { id: 8, name: 'Aston Martin', logo: 'https://i.ibb.co/0hgYHxP/aston.png' }
  ];

  goToBrand(id: number) {
    this.router.navigate(['/brand', id]);
  }

}
