import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CarService } from '../../api/car.service';
import { FavoritesService } from '../../api/favorites.service';

type Car = {
  cid: number;
  brandId: number;
  brandName: string;
  model: string;
  year: number;
  hp: number;
  category: string;
  logo: string;        // image (chez toi c’est "logo")
  description: string;

  // optionnel plus tard (si tu ajoutes dans backend)
  model3dUrl?: string; // .glb
};

@Component({
  selector: 'app-autos',
  imports: [NgForOf, NgIf],
  template: `
    <div class="relative overflow-hidden">
      <!-- halos légers -->
      <div class="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-red-400/15 blur-3xl"></div>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>

      <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- header -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-sky-500"></span>
            <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Autos</span>
            <span class="text-xs font-black text-red-500">•</span>
            <span class="text-xs font-semibold text-slate-500">Scroll by brand</span>
          </div>

          <h2 class="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Autos werden hier pro<span class="text-sky-600"> Brand </span> geteilt
          </h2>
          <p class="mt-2 text-slate-600">
            Klicken Sie auf ⭐ ,wenn Ihnen ein Model besonders gut gefallen hat
          </p>
        </div>

        <!-- loading / empty -->
        <div *ngIf="loading" class="rounded-2xl bg-white/60 ring-1 ring-slate-200/70 backdrop-blur p-6 shadow-sm">
          <div class="font-bold text-slate-800">Chargement des voitures…</div>
          <div class="text-sm text-slate-500 mt-1">Récupération depuis /cars</div>
        </div>

        <div *ngIf="!loading && brandNames.length === 0"
             class="rounded-2xl bg-white/60 ring-1 ring-slate-200/70 backdrop-blur p-6 shadow-sm">
          <div class="font-bold text-slate-800">Aucune voiture trouvée</div>
          <div class="text-sm text-slate-500 mt-1">Vérification necessaire</div>
        </div>

        <!-- brands -->
        <div class="space-y-10" *ngIf="!loading && brandNames.length > 0">
          <div *ngFor="let brand of brandNames">
            <!-- brand title -->
            <div class="flex items-end justify-between gap-4">
              <div>
                <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {{ brand }}
                </h3>
                <div class="text-xs font-semibold text-slate-500 mt-1">
                  {{ carsByBrand[brand]?.length || 0 }} voitures
                </div>
              </div>

              <!-- scroll hint -->
              <div class="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span class="h-1.5 w-1.5 rounded-full bg-sky-500/80"></span>
                Scroll horizontal →
              </div>
            </div>

            <!-- horizontal scroller -->
            <div class="mt-4 overflow-x-auto pb-2">
              <div class="flex gap-4 min-w-full pr-2">
                <div *ngFor="let car of carsByBrand[brand]"
                     (click)="openCar(car)"
                     class="relative group cursor-pointer flex-shrink-0 w-[260px] sm:w-[300px]
                            rounded-2xl bg-white/60 backdrop-blur-xl ring-1 ring-slate-200/70
                            shadow-[0_10px_30px_-20px_rgba(2,6,23,0.35)]
                            transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_-22px_rgba(2,6,23,0.45)]
                            active:translate-y-0 active:scale-[0.99]">

                  <!-- image -->
                  <div class="rounded-t-2xl overflow-hidden bg-slate-100/60">
                    <img [src]="car.logo" [alt]="car.model"
                         class="h-40 w-full object-cover transition duration-200 group-hover:scale-[1.03]" />
                  </div>

                  <!-- favorite star -->
                  <button type="button"
                          (click)="toggleFavorite(car, $event)"
                          class="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full
                                 bg-white/70 backdrop-blur ring-1 ring-slate-200/70 shadow-sm
                                 transition hover:ring-sky-200/70">
                    <svg class="h-5 w-5"
                         [class.text-yellow-400]="isFavorite(car.cid)"
                         [class.text-slate-400]="!isFavorite(car.cid)"
                         viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </button>

                  <!-- content -->
                  <div class="p-4">
                    <div class="font-extrabold text-slate-900 tracking-tight">
                      {{ car.model }}
                    </div>

                    <div class="mt-2 flex items-center justify-between text-sm">
                      <div class="inline-flex items-center gap-2 text-slate-600">
                        <span class="font-bold text-slate-800">{{ car.year }}</span>
                        <span class="text-slate-400">•</span>
                        <span class="font-semibold text-slate-700">{{ car.hp }} HP</span>
                      </div>

                      <span class="text-xs font-bold text-sky-700 bg-sky-500/10 ring-1 ring-sky-500/15 rounded-full px-2 py-1">
                        {{ car.category }}
                      </span>
                    </div>

                    <div class="mt-3 text-xs text-slate-500 line-clamp-2">
                      {{ car.description }}
                    </div>
                  </div>

                  <!-- hover glow -->
                  <div class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-200 group-hover:opacity-100"
                       style="background: radial-gradient(600px circle at 50% 0%, rgba(56,189,248,0.14), transparent 60%);">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MODAL CAR (blur + animation) -->
      <div *ngIf="selectedCar" (window:keydown)="onKeyDown($event)"
           class="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">

        <div class="absolute inset-0 bg-slate-900/45 backdrop-blur-md animate-backdrop"
             (click)="closeCar()"></div>

        <div class="relative w-full max-w-5xl rounded-3xl bg-white/80 backdrop-blur-xl
              ring-1 ring-white/40 shadow-2xl overflow-hidden animate-modalOpenPro">

          <div class="relative bg-slate-100/60">
            <img [src]="selectedCar.logo" [alt]="selectedCar.model"
                 class="w-full h-[240px] sm:h-[320px] md:h-[380px] object-cover image-glow" />

            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"></div>

            <div class="absolute top-4 right-4 flex items-center gap-2">
              <!-- favorite -->
              <button type="button"
                      (click)="toggleFavorite(selectedCar, $event)"
                      class="grid h-11 w-11 place-items-center rounded-full
                       bg-white/70 backdrop-blur ring-1 ring-white/50 shadow-sm
                       hover:ring-sky-200/70 transition">
                <svg class="h-6 w-6"
                     [class.text-yellow-400]="isFavorite(selectedCar.cid)"
                     [class.text-slate-500]="!isFavorite(selectedCar.cid)"
                     viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </button>

              <button (click)="closeCar()"
                      class="rounded-2xl px-4 py-2 text-sm font-extrabold text-slate-900
                       bg-white/70 backdrop-blur ring-1 ring-white/50 shadow-sm
                       hover:text-sky-700 transition">
                Fermer X
              </button>
            </div>

            <!-- title on image -->
            <div class="absolute bottom-4 left-4 right-4">
              <div class="text-xs font-bold tracking-widest text-white/80 uppercase">
                {{ selectedCar.brandName }} • {{ selectedCar.category }}
              </div>
              <div class="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
                <div class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {{ selectedCar.model }}
                </div>
                <div class="text-sm sm:text-base font-bold text-white/80">
                  {{ selectedCar.year }} • {{ selectedCar.hp }} HP
                </div>
              </div>
            </div>
          </div>

          <!-- details -->
          <div class="p-5 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- description -->
              <div class="md:col-span-2 rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-5">
                <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">Description</div>
                <p class="mt-2 text-sm leading-relaxed text-slate-700">
                  {{ selectedCar.description }}
                </p>
              </div>

              <!-- quick specs -->
              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-5">
                <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">Specs</div>

                <div class="mt-3 space-y-3 text-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 font-semibold">Année</span>
                    <span class="text-slate-900 font-extrabold">{{ selectedCar.year }}</span>
                  </div>
                  <div class="h-px bg-slate-200/70"></div>

                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 font-semibold">Puissance</span>
                    <span class="text-slate-900 font-extrabold">{{ selectedCar.hp }} HP</span>
                  </div>
                  <div class="h-px bg-slate-200/70"></div>

                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 font-semibold">Catégorie</span>
                    <span class="text-sky-700 font-extrabold">{{ selectedCar.category }}</span>
                  </div>
                </div>

                <!-- micro CTA -->
                <div class="mt-5 rounded-xl bg-gradient-to-r from-sky-500/10 via-white/20 to-red-500/10
                      ring-1 ring-slate-200/70 p-3 text-xs text-slate-600">
                  Astuce : clique ⭐ pour ajouter aux favoris.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display:block; }

    @keyframes modalOpenPro {
      0% {
        opacity: 0;
        transform: translateY(18px) scale(0.88) rotateZ(-1.5deg);
        filter: blur(6px);
      }
      55% {
        opacity: 1;
        transform: translateY(0) scale(1.03) rotateZ(0deg);
        filter: blur(0px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1) rotateZ(0deg);
        filter: blur(0px);
      }
    }

    @keyframes backdropFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .animate-modalOpenPro {
      animation: modalOpenPro 420ms cubic-bezier(.16,1,.3,1) both;
      transform-origin: 50% 25%;
      will-change: transform, opacity, filter;
    }

    .animate-backdrop {
      animation: backdropFade 220ms ease-out both;
    }

    /* petite “vibe” premium pour l’image */
    .image-glow {
      box-shadow: 0 30px 80px -50px rgba(2,6,23,0.6);
    }
  `],
  standalone: true
})
export class Autos {
  loading = true;

  cars: Car[] = [];
  carsByBrand: Record<string, Car[]> = {};
  brandNames: string[] = [];

  selectedCar: Car | null = null;

  // favoris
  private favoriteCarIds = new Set<number>();

  constructor(
    private router: Router,
    private carService: CarService,
    private favService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadCars();
    this.loadFavoritesIfLoggedIn();
  }

  private loadCars() {
    this.loading = true;
    this.carService.getAll().subscribe({
      next: (data: any[]) => {
        this.cars = (data || []) as Car[];
        this.groupCars();
        this.loading = false;
      },
      error: (err) => {
        console.error('GET /cars failed', err);
        this.cars = [];
        this.groupCars();
        this.loading = false;
      }
    });
  }

  private groupCars() {
    const map: Record<string, Car[]> = {};
    for (const c of this.cars) {
      const key = c.brandName || 'Unknown';
      if (!map[key]) map[key] = [];
      map[key].push(c);
    }

    // tri : marques A→Z ; voitures par année desc (optionnel)
    const brands = Object.keys(map).sort((a, b) => a.localeCompare(b));
    for (const b of brands) {
      map[b] = map[b].slice().sort((x, y) => (y.year ?? 0) - (x.year ?? 0));
    }

    this.carsByBrand = map;
    this.brandNames = brands;
  }

  // ---------- favoris ----------
  private getCurrentUserId(): number | null {
    // adapte si tu stockes autrement
    const raw = localStorage.getItem('userId');
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  private loadFavoritesIfLoggedIn() {
    const userId = this.getCurrentUserId();
    if (!userId) return; // pas connecté => juste UI sans jaune

    this.favService.getUserFavorites(userId).subscribe({
      next: (data: any[]) => {
        // attendu: FavoriteDTO {id, userId, carId}
        this.favoriteCarIds = new Set<number>((data || []).map(x => Number(x.carId)));
      },
      error: (err) => console.warn('GET /favorites failed', err)
    });
  }

  isFavorite(carId: number): boolean {
    return this.favoriteCarIds.has(Number(carId));
  }

  toggleFavorite(car: Car, ev?: Event) {
    ev?.stopPropagation();

    const userId = this.getCurrentUserId();
    if (!userId) {
      this.router.navigate(['/userlogin']);
      return;
    }

    const carId = Number(car.cid);

    // UI optimiste
    const already = this.favoriteCarIds.has(carId);
    if (already) this.favoriteCarIds.delete(carId);
    else this.favoriteCarIds.add(carId);

    const req = already
      ? this.favService.remove(userId, carId)
      : this.favService.add(userId, carId);

    req.subscribe({
      next: () => {},
      error: (err) => {
        console.error('toggle favorite failed', err);
        // rollback
        if (already) this.favoriteCarIds.add(carId);
        else this.favoriteCarIds.delete(carId);
      }
    });
  }

  // ---------- modal ----------
  openCar(car: Car) {
    this.selectedCar = car;
  }

  closeCar() {
    this.selectedCar = null;
  }
  //esc um Fenster zu schließen
  onKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') this.closeCar();
  }

}


