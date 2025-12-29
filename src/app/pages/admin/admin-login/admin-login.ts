import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class=" flex items-center justify-center px-4 bg-gradient-to-b via-slate-500 to-slate-10">
      <div class="w-full max-w-md animate-page-enter">

        <div class="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70 p-7 sm:p-8">

          <div class="text-center">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2
                        ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-sky-500"></span>
              <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Admin</span>
              <span class="text-xs font-black text-red-500">•</span>
              <span class="text-xs font-semibold text-slate-500">Login</span>
            </div>

            <div class="mt-6 flex justify-center">
              <div class="grid h-14 w-14 place-items-center rounded-2xl bg-sky-500/12 ring-1 ring-sky-500/20 shadow-sm">
                <span class="text-2xl">⚙️</span>
              </div>
            </div>

            <h1 class="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
              Admin <span class="text-sky-600">Login</span>
            </h1>

            <p class="mt-2 text-slate-600 text-sm">
              Zugang nur für Administratoren
            </p>
          </div>

          <form class="mt-8 space-y-5">

            <div class="space-y-2">
              <label class="text-slate-700 font-extrabold block">Admin Benutzername</label>
              <input
                class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                       placeholder:text-slate-400 shadow-sm transition
                       focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white"
                placeholder="admin" />
            </div>

            <div class="space-y-2">
              <label class="text-slate-700 font-extrabold block">Passwort</label>
              <input type="password"
                     class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                       placeholder:text-slate-400 shadow-sm transition
                       focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white"
                     placeholder="••••••••"/>
            </div>

            <button routerLink="/admin/admindashb" type="button"
                    class="w-full py-3.5 rounded-2xl font-extrabold tracking-wide text-white
                           bg-gradient-to-r from-sky-500 via-sky-600 to-red-500
                           shadow-lg shadow-sky-500/20 transition duration-200
                           hover:brightness-110 hover:-translate-y-0.5
                           active:translate-y-0 active:scale-[0.99]">
              Einloggen
            </button>
          </form>

        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes pageEnter {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-page-enter {
      animation: pageEnter 420ms cubic-bezier(.16,1,.3,1) both;
    }
  `]
})
export class AdminLogin {}
