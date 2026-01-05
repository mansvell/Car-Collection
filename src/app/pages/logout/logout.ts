import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../api/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterLink,NgIf],
  template: `
    <div class="flex items-center justify-center  px-4 bg-gradient-to-b via-slate-500 to-slate-80"
         xmlns="http://www.w3.org/1999/html">

      <div class="w-full max-w-md animate-page-enter">

        <div class="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70 p-7 sm:p-8 text-center">

          <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2
                      ring-1 ring-slate-200/70 shadow-sm backdrop-blur mb-6">
            <span class="h-2 w-2 rounded-full bg-red-500"></span>
            <span class="text-xs font-bold tracking-widest text-slate-600 uppercase"> Abmelden</span>
          </div>

          <!-- ÉTAPE 1 : CONFIRMATION -->
          <ng-container *ngIf="!loggedOut">

            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 mb-4">
              Möchten Sie sich wirklich <span class="text-red-600">abmelden</span>?
            </h1>
            <div class="h-px flex-1 bg-sky-500 mb-2"></div>
            <p class="text-slate-600 mb-4"> Sie verlieren den Zugriff auf Favoriten und können keine Vorschläge mehr senden</p>


            <div class="flex gap-18 justify-center">
              <button type="button" (click)="cancel()"
                class="px-6 py-3 rounded-2xl font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition">
                NEIN
              </button>

              <button type="button" (click)="confirmLogout()"
                class="px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-red-500 to-red-600
                       text-white shadow-lg shadow-red-500/20 hover:brightness-110 transition">
                JA
              </button>
            </div>
          </ng-container>

          <!-- ÉTAPE 2 : CONFIRMATION DE DÉCONNEXION -->
          <ng-container *ngIf="loggedOut">

            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 mb-4">
              Sie sind jetzt <span class="text-emerald-600">abgemeldet</span>
            </h1>
            <div class="h-px flex-1 bg-sky-500 mb-2"></div>
            <p class="text-slate-600 mb-8">Sie können keine Favoriten mehr hinzufügen und keine Vorschläge senden.</p>

            <a routerLink="/"
               class="inline-block px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-sky-500 to-sky-600
                      text-white shadow-lg shadow-sky-500/20 hover:brightness-110 transition">
              Zur Startseite
            </a>

          </ng-container>
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
export class Logout {

  loggedOut = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  confirmLogout() {
    this.userService.logout();
    this.loggedOut = true;
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
