import { Component } from '@angular/core';
import {CarService} from '../../api/car.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../api/user.service';
import {FavoritesService} from '../../api/favorites.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-car-details',
  standalone: true,
  template: `

    <section class="pt-28 pb-20 px-6 max-w-5xl mx-auto animate-fadeIn">

      <div class="w-full rounded-2xl overflow-hidden shadow-xl mb-10">
        <img src="https://i.ibb.co/vdkcYSt/laferrari.jpg"
             class="w-full h-[400px] object-cover"/>
      </div>

      <h1 class="text-4xl font-bold text-white mb-4">{{ car?.model }} </h1>
      <p class="text-slate-300 mb-6">
        {{ car?.year }} • {{ car?.hp }} • {{ car?.category }} • {{ car?.name }}
      </p>

      <p class="text-slate-400 leading-relaxed mb-10"> {{ car?.description }} </p>


      <button (click)="addToFavorites()" class="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black
                     font-semibold rounded-xl shadow-lg transition">
        zu Favorite hinzufügen
      </button>
      <div *ngIf="added" class="text-green-400 mt-4"> Erfolgreich zu Favoriten hinzugefügt</div>

    </section>
  `,
  imports: [
    NgIf
  ],
  styles: [`
    .animate-fadeIn {
      animation: fadeIn .7s ease forwards;
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
  `]
})
export class CarDetail {
  car: any = null;
  added = false;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private userService: UserService,
    private favService : FavoritesService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.carService.getAll().subscribe((cars: any[]) => {
      this.car = cars.find(c => c.cid === id);
    });
  }
  addToFavorites() {
    const userId = this.userService.getUserId();

    if (!userId) {
      alert("Bitte einloggen, um Favoriten zu speichern.");
      return;
    }

    this.favService.add(userId, this.car.cid).subscribe(() => {
      this.added = true;
    });
  }
}
