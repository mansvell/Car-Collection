import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf
  ],
  template: `
    <div class="animated-bg ">
    <section class="pt-10 pb-20 px-5 max-w-6xl mx-auto">

      <div class="text-center mt-10 mb-16 ">
        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4">
          Entdecken Sie die Automobilmarken</h1>
        <p class="text-slate-300 text-lg opacity-80 max-w-2xl mx-auto">
          Entdecken Sie eine einzigartige Sammlung von Luxusautos, Supersportwagen und seltenen Modellen
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

        <div *ngFor="let brand of brands" (click)="goToBrand(brand.id)"
          class="cursor-pointer bg-slate-800/40 border border-slate-700/40 rounded-xl p-5 flex flex-col items-center
                 hover:bg-slate-800 hover:scale-[1.03] hover:shadow-xl transition-all duration-200">

          <img [src]="brand.logo" [alt]="brand.name" class="h-16 mb-4 opacity-90"/>
          <span class="text-white font-medium tracking-wide">{{ brand.name }}</span>
        </div>

      </div>
    </section>
    </div>
  `,
  styles: [`
    /* 🔥 Animated Gradient Background */
    .animated-bg {
      background: linear-gradient(-45deg, #05273c, #06273c, #0a142c, #012d2e);
      background-size: 400% 400%;
      animation: gradientShift 8s ease infinite;
    }

    @keyframes gradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
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
