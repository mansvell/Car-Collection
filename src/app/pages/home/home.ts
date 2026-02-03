import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { BrandService } from '../../api/brand.service';
import { filter } from 'rxjs';

type Brand = {
  bid: number;
  name: string;
  logo: string;
  foundedYear?: number | null;
  foundedBy?: string | null;
  currentOwner?: string | null;
  employeesApprox?: number | null;
  originCountry?: string | null;
  description?: string | null;
};


@Component({
  selector: 'app-home',
  imports: [NgForOf, NgIf],
  template: `
    <div class=" relative overflow-hidden ">

      <section class="relative pt-6 pb-10 px-4 sm:px-6 lg:px-6 max-w-7xl mx-auto">
        <div class="text-center mt-2 mb-15">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-sky-500"></span>
            <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Logos</span>
            <span class="text-xs font-black text-red-500">•</span>
            <span class="text-xs font-semibold text-slate-500">Collection Premium</span>
          </div>

          <h1 class="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Entdecken Sie die <span class="text-sky-600">Automobilmarken</span>
          </h1>

          <p class="mt-4 text-slate-600 text-base sm:text-lg mx-auto">
            Klicken Sie auf einen Brand ,um wichtige Sachen und die kurze Geschichte zu erfahren!
          </p>
        </div>

        <div *ngIf="loading"
             class="mt-9 rounded-2xl bg-white/60 backdrop-blur ring-1 ring-slate-200/70 p-6 text-center shadow-sm">
          <div class="text-sm font-bold text-slate-700">Hinweis: Doppelklicken Sie auf die Navigation ,um Marken anzuzeigen, denn das Laden von Marken nimmt viel Zeit...</div>
        </div>

        <div *ngIf="!loading && brands.length > 0"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 transition"
          [class.blur-sm]="selectedBrand"
          [class.opacity-60]="selectedBrand">

          <div *ngFor="let brand of brands" (click)="openStory(brand)"
               class="cursor-pointer flex flex-col items-center hover:scale-[1.1] transition-transform duration-200">

            <img [src]="brand.logo" [alt]="brand.name" class="lg:h-50 w-auto sm:h-24  object-contain drop-shadow-lg " />

            <span class="mt-3 text-slate-900 font-extrabold tracking-tight">
              {{ brand.name }}
            </span>
            <span class="mt-1 text-xs font-semibold text-slate-500">
              <span class="text-red-500">•</span>
              <span class="text-sky-600">Infos</span>
            </span>
          </div>
        </div>


      </section>


      <div *ngIf="selectedBrand"
           class="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">

        <div class="absolute inset-0 bg-slate-900/35 backdrop-blur-md" (click)="closeStory()"></div>

        <div class="relative w-full max-w-2xl rounded-3xl bg-white/75 backdrop-blur-xl
                    ring-1 ring-slate-200/70 shadow-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col animate-storyOpen ">

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
              Schließen X
            </button>
          </div>

          <!-- content -->
          <div class="p-5 sm:p-6 flex-1 overflow-y-auto">
            <div class="grid grid-cols-2 sm:grid-cols-2 gap-3 text-sm">
              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">erstellt in </div>
                <div class="mt-1 font-extrabold text-slate-900">{{ selectedBrand.foundedYear ?? '—' }}</div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">gegründet von</div>
                <div class="mt-1 font-extrabold text-slate-900">{{ selectedBrand.foundedBy ?? '—' }}</div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">aktueller Eigentümer</div>
                <div class="mt-1 font-extrabold text-slate-900">{{ selectedBrand.currentOwner ?? '—' }}</div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
                <div class="text-xs font-bold text-slate-500">Anzahl Mitarbeiter(≈)</div>
                <div class="mt-1 font-extrabold text-slate-900">
                  {{ selectedBrand.employeesApprox ?? '—' }}
                </div>
              </div>

              <div class="rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4 sm:col-span-2">
                <div class="text-xs font-bold text-slate-500">Heimatland</div>
                <div class="mt-1 font-extrabold text-slate-900">{{ selectedBrand.originCountry ?? '—' }}</div>
              </div>
            </div>

            <div class="mt-4 rounded-2xl bg-white/55 ring-1 ring-slate-200/70 p-4">
              <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">Kurze Geschichte</div>
              <p class="mt-2 text-sm leading-relaxed text-slate-700">
                {{ selectedBrand.description ?? 'Geschichte noch nicht vorhanden' }}
              </p>
            </div>

            <div class="mt-4 text-xs text-slate-500">
              CarCollection by Mansvell Nkwanga
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

  loading = false;     // true pendant la requête
  loadedOnce = false;  // devient true après la 1ère réponse (success ou error)

  constructor(
    private router: Router,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  private loadBrands(): void {
    this.loading = true;
    this.loadedOnce = false;

    this.brandService.getAll().subscribe({
      next: (data: Brand[]) => {
        this.brands = Array.isArray(data) ? data : [];
        this.loading = false;
        this.loadedOnce = true;
      },
      error: (err) => {
        console.error('GET /brands failed', err);
        this.brands = [];
        this.loading = false;
        this.loadedOnce = true;
      }
    });
  }

  openStory(brand: Brand) {
    this.selectedBrand = brand;
  }

  closeStory() {
    this.selectedBrand = null;
  }
}

