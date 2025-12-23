import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { BrandService } from '../../api/brand.service';
import { filter } from 'rxjs';

type Brand = {
  bid: number;
  name: string;
  logo: string;
};

type BrandStory = {
  foundedYear: number;
  foundedBy: string;
  currentOwner: string;
  employeesApprox: number;
  originCountry: string;
  description: string;
};

@Component({
  selector: 'app-home',
  imports: [NgForOf, NgIf],
  template: `
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-red-400/20 blur-3xl"></div>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>

      <section class="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mt-6 mb-12">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-sky-500"></span>
            <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Brands</span>
            <span class="text-xs font-black text-red-500">•</span>
            <span class="text-xs font-semibold text-slate-500">Collection Premium</span>
          </div>

          <h1 class="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Entdecken Sie die <span class="text-sky-600">Automobilmarken</span>
          </h1>

          <p class="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Entdecken Sie eine einzigartige Sammlung von Luxusautos, Supersportwagen und seltenen Modellen.
          </p>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 transition"
          [class.blur-sm]="selectedBrand"
          [class.opacity-60]="selectedBrand">

          <div *ngFor="let brand of brands"
               (click)="openStory(brand)"
               class="cursor-pointer flex flex-col items-center
                      hover:scale-[1.03] transition-transform duration-200">

            <img [src]="brand.logo" [alt]="brand.name" class="h-20 sm:h-24 w-auto object-contain drop-shadow-md" />

            <span class="mt-3 text-slate-900 font-extrabold tracking-tight">
              {{ brand.name }}
            </span>
            <span class="mt-1 text-xs font-semibold text-slate-500">
              Cliquez pour l’histoire <span class="text-red-500">•</span>
              <span class="text-sky-600">infos</span>
            </span>
          </div>
        </div>

        <!--Empty state-->
        <div *ngIf="brands.length === 0"
             class="mt-10 rounded-2xl bg-white/60 backdrop-blur ring-1 ring-slate-200/70 p-6 text-center shadow-sm">
          <div class="text-sm font-bold text-slate-700">Aucune marque trouvée</div>
          <div class="text-xs text-slate-500 mt-1">Vérifie ton backend /brands ou ton réseau.</div>
        </div>
      </section>

      <!--STORY (blur  + animation) -->
      <div *ngIf="selectedBrand"
           class="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
        <!-- backdrop -->
        <div class="absolute inset-0 bg-slate-900/35 backdrop-blur-md" (click)="closeStory()"></div>

        <!-- panel animé (spin/zoom/fade) -->
        <div class="relative w-full max-w-2xl rounded-3xl bg-white/75 backdrop-blur-xl
                    ring-1 ring-slate-200/70 shadow-2xl
                    animate-storyOpen">

          <div class="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200/60">
            <div class="flex items-center gap-4">
              <div class="grid h-14 w-14 place-items-center rounded-2xl bg-slate-50/70 ring-1 ring-slate-200/70 shadow-sm">
                <img [src]="selectedBrand.logo" [alt]="selectedBrand.name" class="h-9 w-auto object-contain" />
              </div>
              <div>
                <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">Brand Story</div>
                <div class="text-xl font-extrabold text-slate-900">
                  {{ selectedBrand.name }}
                  <span class="text-red-500">•</span>
                </div>
              </div>
            </div>

            <button (click)="closeStory()"
                    class="rounded-xl px-3 py-2 text-sm font-bold text-slate-700
                           bg-white/60 ring-1 ring-slate-200/70 shadow-sm
                           hover:text-sky-700 hover:ring-sky-200/70 transition">
              Fermer X
            </button>
          </div>

          <!-- content -->
          <div class="p-5 sm:p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">Créée en</div>
                <div class="mt-1 font-extrabold text-slate-900">{{ story?.foundedYear ?? '—' }}</div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">Fondée par</div>
                <div class="mt-1 font-extrabold text-slate-900">{{ story?.foundedBy ?? '—' }}</div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">Propriétaire actuel</div>
                <div class="mt-1 font-extrabold text-slate-900">{{ story?.currentOwner ?? '—' }}</div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">Employés (≈)</div>
                <div class="mt-1 font-extrabold text-slate-900">
                  {{ story?.employeesApprox ? (story?.employeesApprox + '') : '—' }}
                </div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4 sm:col-span-2">
                <div class="text-xs font-bold text-slate-500">Pays d’origine</div>
                <div class="mt-1 font-extrabold text-slate-900">{{ story?.originCountry ?? '—' }}</div>
              </div>
            </div>

            <div class="mt-4 rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
              <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">Histoire</div>
              <p class="mt-2 text-sm leading-relaxed text-slate-700">
                {{ story?.description ?? 'Histoire non disponible pour le moment (on branchera le backend).' }}
              </p>
            </div>

            <div class="mt-4 text-xs text-slate-500">
              (Animation: rotation + zoom + fade. On peut la rendre plus “Mercedes style” si tu veux.)
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }

    /* animation ouverture : tourne + zoom + fade */
    @keyframes storyOpen {
      0%   { opacity: 0; transform: translateY(12px) scale(0.92) rotateX(18deg) rotateZ(-2deg); }
      60%  { opacity: 1; transform: translateY(0) scale(1.02) rotateX(0deg) rotateZ(0deg); }
      100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0deg) rotateZ(0deg); }
    }
    .animate-storyOpen {
      animation: storyOpen 320ms cubic-bezier(.2,.9,.2,1) both;
      transform-origin: 50% 20%;
    }
  `],
  standalone: true
})
export class Home {
  brands: Brand[] = [];

  selectedBrand: Brand | null = null;
  story: BrandStory | null = null;

  //temporaire: histoires en local (à remplacer par endpoint)
  private storyMap: Record<string, BrandStory> = {
    BMW: {
      foundedYear: 1916,
      foundedBy: 'Karl Rapp / Gustav Otto (origines)',
      currentOwner: 'BMW Group (public)',
      employeesApprox: 150000,
      originCountry: 'Allemagne',
      description: 'BMW est connue pour ses voitures premium, ses moteurs performants et une forte culture d’ingénierie.'
    },
    Mercedes: {
      foundedYear: 1926,
      foundedBy: 'Fusion Daimler & Benz',
      currentOwner: 'Mercedes-Benz Group AG',
      employeesApprox: 170000,
      originCountry: 'Allemagne',
      description: 'Mercedes-Benz est une référence mondiale du luxe automobile, innovation et sécurité.'
    }
  };

  constructor(
    private router: Router,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.loadBrands();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/' || this.router.url === '') {
          this.loadBrands();
        }
      });
  }

  private loadBrands() {
    this.brandService.getAll().subscribe({
      next: (data: any) => this.brands = data,
      error: (err) => {
        console.error('GET /brands failed', err);
        this.brands = [];
      }
    });
  }

  openStory(brand: Brand) {
    this.selectedBrand = brand;
    this.story = this.storyMap[brand.name] ?? null;
  }

  closeStory() {
    this.selectedBrand = null;
    this.story = null;
  }
}


/* Marques (en dur pour l'instant)
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
}*/

