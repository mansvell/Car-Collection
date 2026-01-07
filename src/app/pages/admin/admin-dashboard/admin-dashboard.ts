import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {AdminService} from '../../../api/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-b via-slate-500 to-slate-10">

      <section class="pt-2 pb-20 px-5 sm:px-6 max-w-8xl mx-auto animate-page-enter">

        <div *ngIf="error" class="mt-1 mb-4 rounded-2xl bg-white/70 ring-1 ring-red-200/70 p-4">
          <div class="font-extrabold text-red-600">Fehler</div>
          <div class="text-sm text-slate-600 mt-1">{{ error }}</div>
        </div>

        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2
                        ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-sky-500"></span>
              <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Admin</span>
              <span class="text-xs font-black text-red-500">•</span>
              <span class="text-xs font-semibold text-slate-500">Dashboard</span>
            </div>

            <h1 class="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Admin <span class="text-sky-600">Übersicht</span>
            </h1>

            <p class="mt-2 text-slate-600 text-sm sm:text-base">
              Monitoring, Warteschlange und Entscheidungen — alles an einem Ort
            </p>
          </div>

          <div >
            <a routerLink="/logout"
               class="inline-flex items-center gap-2 rounded-2xl px-2 py-2  ring-1 ring-slate-200/70
                      hover:bg-slate-200 bg-red-300">
              <span class="grid h-9 w-9 place-items-center rounded-xl bg-red-500/10 ring-1 ring-red-200/60">
                🔒
              </span>
              <span class="font-extrabold  hover:text-red-800 "> Abmelden</span>
            </a>
          </div>
        </div>

        <!-- KPI cards -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div *ngFor="let stat of stats"
               class="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70
                      shadow-[0_20px_55px_-40px_rgba(2,6,23,0.35)]
                      p-5 sm:p-6 hover:-translate-y-0.5 transition">
            <div class="flex items-center justify-between">
              <div class="grid h-12 w-12 place-items-center  rounded-2xl bg-sky-500/10 ring-1 ring-sky-200/70">
                <span class="text-2xl ">{{ stat.icon }}</span>
              </div>
              <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">
                Live
              </div>
            </div>

            <div class="mt-4 text-xs font-bold tracking-widest text-slate-500 uppercase">
              {{ stat.label }}
            </div>
            <div class="mt-1 text-2xl font-extrabold text-slate-900">
              {{ stat.value }}
            </div>
          </div>
        </div>

        <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="lg:col-span-2 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70
                      shadow p-6 sm:p-7">
            <div class="flex items-start lg:justify-between gap-4">
              <div>
                <div class="text-xs font-bold  text-slate-500 uppercase">
                  Schneller Überblick
                </div>
                <h2 class="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
                  Heute im Admin-Bereich
                </h2>
              </div>

              <div class="sm:flex items-center gap-2 rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-3 py-2">
                <span class="text-slate-500 text-xs font-bold">Status</span>
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span class="text-slate-700 text-xs font-extrabold">Statistiken</span>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">

              <div class="rounded-2xl bg-white/60 ring-4 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Letztes hinzugefügtes Auto: </p>
                <p class="mt-1 font-extrabold text-slate-900">{{ overview.lastCar }}</p>
              </div>

              <div class="rounded-2xl bg-white/60 ring-4 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Letzte hinzugefügte Marke: </p>
                <p class="mt-1 font-extrabold text-slate-900">{{ overview.brandName }}</p>
              </div>

              <div class="rounded-2xl bg-white/60 ring-4 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Beliebteste Kategorie :  </p>
                <p class="mt-1 font-extrabold text-slate-900">{{ topCategoryText }}  </p>
              </div>

              <div class="rounded-2xl bg-white/60 ring-4 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Beliebtes Auto : </p>
                <p class="mt-1 font-extrabold text-slate-900"> {{ mostLikedCarText }}</p>
              </div>
              <div class="rounded-2xl bg-white/60 ring-4 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Abgesagte Vorschläge</p>
                <p class="mt-1 font-extrabold text-slate-900"> {{ rejectedSuggestions }}</p>
              </div>
              <div class="rounded-2xl bg-white/60 ring-4 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Zugesagte Vorschläge :</p>
                <p class="mt-1 font-extrabold text-slate-900">{{ approvedSuggestions }}</p>
              </div>

            </div>

          </div>

        </div>

        <!-- Divider -->
        <div class="mt-14 flex items-center gap-3">
          <div class="h-px flex-1 bg-sky-500 "></div>
          <div class=" font-bold text-slate-500 uppercase">
            Wartende Vorschläge
          </div>
          <div class="h-px flex-1 bg-sky-500"></div>
        </div>

        <div class="mt-8 space-y-4">
          <div *ngFor="let s of pendingSuggestions; let i = index"
               class="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70
                      shadow-[0_20px_55px_-40px_rgba(2,6,23,0.35)]
                      overflow-hidden
                      transition hover:-translate-y-0.5"
               [class.reveal]="revealEnabled">

            <div class="grid grid-cols-1 md:grid-cols-5 gap-1">

              <div class="md:col-span-2 relative bg-slate-100/60">
                <img [src]="s.logo" [alt]="s.model"
                     class="h-56 md:h-full w-full object-cover" />
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="text-xs font-bold  text-white/80 uppercase">Preview</div>
                  <div class="text-sm font-extrabold text-white">{{ s.brand }} — {{ s.model }}</div>
                </div>
              </div>

              <div class="md:col-span-3 p-6 sm:p-7">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">
                      Vorschlag #{{ i + 1 }}
                    </div>
                    <div class="mt-2 text-xl font-extrabold text-slate-900">
                      von : {{ s.userVorName }} {{ s.userNachname}}<span class="text-red-500">•</span> {{ s.userEmail}}
                    </div>
                  </div>

                  <div class="inline-flex items-center gap-2 rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-3 py-2">
                    <span class="text-xs font-bold text-slate-500">Status</span>
                    <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span class="text-xs font-extrabold text-slate-800">Pending</span>
                  </div>
                </div>

                <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div class="rounded-2xl bg-white/60 ring-1 ring-slate-200/70 p-4">
                    <div class="text-xs font-bold text-slate-500">Preis</div>
                    <div class="mt-1 font-extrabold text-slate-900">{{ s.year }}</div>
                  </div>

                  <div class="rounded-2xl bg-white/60 ring-1 ring-slate-200/70 p-4">
                    <div class="text-xs font-bold text-slate-500">HP</div>
                    <div class="mt-1 font-extrabold text-slate-900">{{ s.hp }}</div>
                  </div>

                  <div class="rounded-2xl bg-white/60 ring-1 ring-slate-200/70 p-4 col-span-2">
                    <div class="text-xs font-bold text-slate-500">Kategorie</div>
                    <div class="mt-1 font-extrabold text-sky-700">{{ s.category }}</div>
                  </div>
                </div>

                <div class="mt-4 rounded-2xl bg-white/60 ring-1 ring-slate-200/70 p-4">
                  <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">Beschreibung</div>
                  <p class="mt-2 text-sm leading-relaxed text-slate-700">
                    {{ s.description }}
                  </p>
                </div>

                <div class="mt-5 flex flex-col sm:flex-row gap-3">
                  <button type="button" (click)="accept(s)" [disabled]="busyIds.has(s.sid)"
                          class="flex-1 rounded-2xl py-3 font-extrabold text-white
                                 bg-gradient-to-r from-emerald-500 to-sky-600
                                 hover:brightness-110 hover:-translate-y-0.5">
                    Zusagen
                  </button>

                  <button type="button" (click)="reject(s)" [disabled]="busyIds.has(s.sid)"
                          class="flex-1 rounded-2xl py-3 font-extrabold text-white
                                 bg-gradient-to-r from-red-500 to-red-600
                                 shadow-lg shadow-red-500/10
                                 hover:brightness-110 hover:-translate-y-0.5 transition
                                 active:translate-y-0 active:scale-[0.99]">
                    Absagen
                  </button>
                </div>
              </div>


            </div>

          </div>
        </div>

      </section>
    </div>
  `,
  styles: [`
    @keyframes pageEnter {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-page-enter {
      animation: pageEnter 420ms cubic-bezier(.16,1,.3,1) both;
    }

    /* small scroll reveal feel (subtle) */
    .reveal {
      animation: revealIn 520ms cubic-bezier(.16,1,.3,1) both;
    }
    @keyframes revealIn {
      0% { opacity: 0; transform: translateY(10px) scale(.99); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
  `]
})
export class AdminDashboard {

  // --- UI states ---
  loadingKpis = false;
  error = '';

  scrollProgress = 0;
  revealEnabled = false;


  stats = [
    { label: 'Gesamte Autos', value: '00', icon: '🏎️' },
    { label: 'Gesamte Marken', value: '00', icon: '🏷️' },
    { label: 'Vorschläge Pending', value: '00', icon: '💡' },
    { label: 'Benutzer (App)', value: '00', icon: '👥' },
    { label: 'Admin Sessions', value: '1', icon: '🛡️' }
  ];

  overview = {
    lastCar: '_',
    pendingSuggestions: 3,
    brandName: '_',
  };

  topCategoryText = '-';
  mostLikedCarText = '-';

  totalUsers = 100;
  approvedSuggestions = 100;
  rejectedSuggestions = 100;


  pendingSuggestions: any[] = [];
  busyIds = new Set<number>();   // empêcher double-clic

  constructor(private adminApi: AdminService) {}

  ngOnInit(): void {
    this.refreshKpis();
    this.loadAnalytics();
    this.loadCounts();
    this.loadPendingSuggestions();
  }

  refreshKpis() {
    this.error = '';
    this.loadingKpis = true;

    this.adminApi.getCars().subscribe({
      next: (cars) => {

        const totalCars = Array.isArray(cars) ? cars.length : 0;
        this.stats[0].value = String(totalCars);

        //on prend le dernier item de la liste
        const lastCar = totalCars > 0 ? cars[cars.length - 1] : null;
        this.overview.lastCar = lastCar?.model ?? '-';

        this.adminApi.getBrands().subscribe({
          next: (brands) => {
            const totalBrands = Array.isArray(brands) ? brands.length : 0;
            this.stats[1].value = String(totalBrands);

            const lastBrand = totalBrands > 0 ? brands[brands.length - 1] : null;
            this.overview.brandName = lastBrand?.name ?? '-';

            //Pending suggestions
            this.adminApi.getPendingSuggestions().subscribe({
              next: (pending) => {
                const totalPending = Array.isArray(pending) ? pending.length : 0;
                this.stats[2].value = String(totalPending);
                this.overview.pendingSuggestions = totalPending;

                this.loadingKpis = false;
              },
              error: () => {
                this.error = 'Pending suggestions konnten nicht geladen werden.';
                this.loadingKpis = false;
              }
            });
          },
          error: () => {
            this.error = 'Brands konnten nicht geladen werden.';
            this.loadingKpis = false;
          }
        });

      },
      error: () => {
        this.error = 'Cars konnten nicht geladen werden.';
        this.loadingKpis = false;
      }
    });
  }

  loadAnalytics() {
    this.adminApi.getMostLikedCategory().subscribe({
      next: (res: any) => {
        const cat = res?.category ?? '-';
        const likes = Number(res?.likes ?? 0);
        this.topCategoryText = `${cat} (${likes} Likes)`;
      },
      error: () => {
        this.topCategoryText = '-';
      }
    });

    this.adminApi.getMostLikedCar().subscribe({
      next: (res: any) => {
        const likes = Number(res?.likes ?? 0);
        const car = res?.car;

        if (!car) {
          this.mostLikedCarText = '-';
          return;
        }

        this.mostLikedCarText = `${car.brandName} ${car.model} (${likes} Likes)`;
      },
      error: () => {
        this.mostLikedCarText = '-';
      }
    });
  }

  private loadCounts() {
    this.error ='';
    // Benutzer (App)
    this.adminApi.getUserCount().subscribe({
      next: (n) => {
        this.totalUsers = n;
        this.stats[3].value = String(n);
      }
    });

    // Zugesagte
    this.adminApi.getApprovedSuggestionsCount().subscribe({
      next: (n) => {
        this.approvedSuggestions = n;
      },
      error: () =>  {
        this.error='sfdsfdfsdf';
      }
    });

    // Abgesagte
    this.adminApi.getRejectedSuggestionsCount().subscribe({
      next: (n) => {
        this.rejectedSuggestions = n;
      }
    });
  }


  accept(s: any) {
    const id = Number(s?.sid);
    if (!id || this.busyIds.has(id)) return;

    this.busyIds.add(id);
    this.error = '';

    this.adminApi.acceptSuggestion(id).subscribe({
      next: () => {
        // 1) retirer de la liste UI
        this.pendingSuggestions = this.pendingSuggestions.filter(x => x.sid !== id);

        // 2) refresh rapide des compteurs + KPI
        this.refreshAfterDecision();

        this.busyIds.delete(id);
      },
      error: () => {
        this.error = 'Zusagen fehlgeschlagen.';
        this.busyIds.delete(id);
      }
    });
  }

  reject(s: any) {
    const id = Number(s?.sid);
    if (!id || this.busyIds.has(id)) return;

    this.busyIds.add(id);
    this.error = '';

    this.adminApi.rejectSuggestion(id).subscribe({
      next: () => {
        this.pendingSuggestions = this.pendingSuggestions.filter(x => x.sid !== id);
        this.refreshAfterDecision();
        this.busyIds.delete(id);
      },
      error: () => {
        this.error = 'Absagen fehlgeschlagen.';
        this.busyIds.delete(id);
      }
    });
  }
  private refreshAfterDecision() {
    // KPI + liste pending (optionnel)
    this.refreshKpis();

    // compteurs users/approved/rejected (ta méthode existante)
    this.loadCounts();
  }

  private loadPendingSuggestions() {
    this.adminApi.getPendingSuggestions().subscribe({
      next: (pending) => {
        console.log('PENDING FROM API:', pending);
        this.pendingSuggestions = pending ?? [];
      },
      error: (err) => {
        console.error('PENDING ERROR:', err);
        this.error = 'Pending suggestions konnten nicht geladen werden.';
        this.pendingSuggestions = [];
      }
    });
  }


  @HostListener('window:scroll')
  onScroll() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    // enable reveal once user starts scrolling a bit
    this.revealEnabled = scrollTop > 220;
  }
}
