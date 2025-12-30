import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <!-- Scroll progress (cool) -->
      <div class="fixed top-0 left-0 right-0 z-40 h-1 bg-transparent">
        <div class="h-1 bg-gradient-to-r from-sky-500 via-sky-600 to-red-500"
             [style.width.%]="scrollProgress"></div>
      </div>

      <section class="pt-24 pb-20 px-5 sm:px-6 max-w-7xl mx-auto animate-page-enter">

        <!-- Top bar -->
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
              Monitoring, Warteschlange und Entscheidungen — alles an einem Ort.
            </p>
          </div>

          <!-- Strategic professional logout (sticky-like) -->
          <div class="shrink-0">
            <a routerLink="/admin/logout"
               class="group inline-flex items-center gap-2 rounded-2xl px-4 py-3
                      bg-white/70 backdrop-blur ring-1 ring-slate-200/70 shadow-sm
                      hover:ring-red-200/70 transition">
              <span class="grid h-9 w-9 place-items-center rounded-xl bg-red-500/10 ring-1 ring-red-200/60">
                🔒
              </span>
              <span class="font-extrabold text-slate-800 group-hover:text-red-600 transition">
                Logout
              </span>
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
              <div class="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/10 ring-1 ring-sky-200/70">
                <span class="text-2xl">{{ stat.icon }}</span>
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

        <!-- Overview section -->
        <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div class="lg:col-span-2 rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70
                      shadow p-6 sm:p-7">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-xs font-bold  text-slate-500 uppercase">
                  Schneller Überblick
                </div>
                <h2 class="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
                  Heute im Admin-Bereich
                </h2>
              </div>

              <div class="hidden sm:flex items-center gap-2 rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-3 py-2">
                <span class="text-slate-500 text-xs font-bold">Status</span>
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span class="text-slate-700 text-xs font-extrabold">Memories</span>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">

              <div class="rounded-2xl bg-white/60 ring-5 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Letztes hinzugefügtes Auto: </p>
                <p class="mt-1 font-extrabold text-slate-900">{{ overview.lastCar }}</p>
              </div>

              <div class="rounded-2xl bg-white/60 ring-5 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Vorschläge in Warteschlange : </p>
                <p class="mt-1 font-extrabold text-slate-900">
                  {{ overview.pendingSuggestions }}
                  <span class="text-red-500 font-black">•</span>
                  <span class="text-sky-700"> noch offen</span>
                </p>
              </div>

              <div class="rounded-2xl bg-white/60 ring-5 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Letzte hinzugefügte Marke: </p>
                <p class="mt-1 font-extrabold text-slate-900">{{ overview.brandName }}</p>
              </div>

              <div class="rounded-2xl bg-white/60 ring-5 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Letzte Verbindung als Admin: </p>
                <p class="mt-1 font-extrabold text-slate-900">{{ overview.lastAdminLogin }}</p>
              </div>
              <div class="rounded-2xl bg-white/60 ring-5 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Letzte hinzugefügte Marke :</p>
                <p class="mt-1 font-extrabold text-slate-900">{{ overview.brandName }}</p>
              </div>
              <div class="rounded-2xl bg-white/60 ring-5 ring-blue-300 p-4">
                <p class=" font-bold text-slate-500">Letzte hinzugefügte Marke :</p>
                <p class="mt-1 font-extrabold text-slate-900">{{ overview.brandName }}</p>
              </div>

            </div>

          </div>

        </div>

        <!-- Divider -->
        <div class="mt-14 flex items-center gap-3">
          <div class="h-px flex-1 bg-sky-500 "></div>
          <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Wartende Vorschläge
          </div>
          <div class="h-px flex-1 bg-sky-500"></div>
        </div>

        <!-- Pending suggestions list -->
        <div class="mt-8 space-y-4">
          <div *ngFor="let s of pendingSuggestions; let i = index"
               class="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70
                      shadow-[0_20px_55px_-40px_rgba(2,6,23,0.35)]
                      overflow-hidden
                      transition hover:-translate-y-0.5"
               [class.reveal]="revealEnabled">

            <div class="grid grid-cols-1 md:grid-cols-5 gap-1">

              <div class="md:col-span-2 relative bg-slate-100/60">
                <img [src]="s.logo" [alt]="s.modelName"
                     class="h-56 md:h-full w-full object-cover" />
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="text-xs font-bold  text-white/80 uppercase">Preview</div>
                  <div class="text-sm font-extrabold text-white">{{ s.brandName }} — {{ s.modelName }}</div>
                </div>
              </div>

              <div class="md:col-span-3 p-6 sm:p-7">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="text-xs font-bold tracking-widest text-slate-500 uppercase">
                      Vorschlag #{{ i + 1 }}
                    </div>
                    <div class="mt-2 text-xl font-extrabold text-slate-900">
                      {{ s.brandName }} <span class="text-red-500">•</span> {{ s.modelName }}
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
                    <div class="text-xs font-bold text-slate-500">Jahr</div>
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

                <!-- Actions -->
                <div class="mt-5 flex flex-col sm:flex-row gap-3">
                  <button type="button"
                          class="flex-1 rounded-2xl py-3 font-extrabold text-white
                                 bg-gradient-to-r from-emerald-500 to-sky-600
                                 shadow-lg shadow-emerald-500/10
                                 hover:brightness-110 hover:-translate-y-0.5 transition
                                 active:translate-y-0 active:scale-[0.99]">
                    Zusagen
                  </button>

                  <button type="button"
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

  scrollProgress = 0;
  revealEnabled = false;

  // UI stats (mock)
  stats = [
    { label: 'Gesamte Autos', value: '28', icon: '🚗' },
    { label: 'Gesamte Marken', value: '8', icon: '🏷️' },
    { label: 'Vorschläge Pending', value: '3', icon: '⭐' },
    { label: 'Benutzer (App)', value: '126', icon: '👥' },
    { label: 'Admin Sessions', value: '1', icon: '🛡️' }
  ];

  overview = {
    lastCar: 'Ferrari F8 Tributo',
    pendingSuggestions: 3,
    lastAdminLogin: 'vor 2 Stunden',
    brandName: 'VW'
  };

  // For the small queue bar
  get queueFill(): number {
    const max = 10; // purely UI scaling
    return Math.min(100, (this.overview.pendingSuggestions / max) * 100);
  }

  // Mock pending suggestions (later connect to backend)
  pendingSuggestions = [
    {
      logo: 'https://th.bing.com/th/id/R.6d59b322982eeee85f0e53118d61d97d?rik=PQ4fPRgAbsG1%2bg&riu=http%3a%2f%2fwww.hdcarwallpapers.com%2fwalls%2f2016_bmw_m2_coupe-wide.jpg&ehk=HyFhDaBe0NheJdPM5P2SRyYV1ueHrF4li70l6VLheIY%3d&risl=&pid=ImgRaw&r=0',
      modelName: 'M4 Competition',
      brandName: 'BMW',
      year: 2024,
      hp: 510,
      category: 'SPORTCAR',
      description: 'Sehr sportlich, ikonisches Design, perfekt für die Collection. Bitte hinzufügen.'
    },
    {
      logo: 'images/cars/demo2.jpg',
      modelName: 'G63 AMG',
      brandName: 'Mercedes',
      year: 2025,
      hp: 585,
      category: 'SUV',
      description: 'Luxury SUV Klassiker. Diese Variante sollte unbedingt in der Collection sein.'
    },
    {
      logo: 'images/cars/demo3.jpg',
      modelName: 'SF90 Stradale',
      brandName: 'Ferrari',
      year: 2023,
      hp: 1000,
      category: 'SUPERCAR',
      description: 'Hybrid-Supercar mit beeindruckender Leistung. Sehr gefragt bei Usern.'
    }
  ];

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
