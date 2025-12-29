import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../api/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class=" flex items-center justify-center px-4 bg-gradient-to-b via-slate-500 to-slate-10">
      <div class="w-full max-w-md animate-page-enter">


        <div class="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70
                    shadow-[0_25px_70px_-45px_rgba(2,6,23,0.45)]
                    p-7 sm:p-8">

          <!-- Header -->
          <div class="text-center">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2
                        ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-sky-500"></span>
              <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Login</span>
              <span class="text-xs font-black text-red-500">•</span>
              <span class="text-xs font-semibold text-slate-500">User</span>
            </div>

            <h1 class="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
              Verbindung <span class="text-sky-600">herstellen</span>
            </h1>

            <p class="mt-2 text-slate-600 text-sm">
              Loggen Sie sich ein, um Ihre Favoriten zu verwalten, oder einen Vorschlag zu machen
            </p>
          </div>

          <form (ngSubmit)="login()" class="mt-8 space-y-5">

            <div class="space-y-2">
              <label class="text-slate-700 font-extrabold block">Email</label>
              <input [(ngModel)]="username" name="username" required
                     class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                            placeholder:text-slate-400 shadow-sm transition
                            focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white"
                     placeholder="example@gmail.com" />
            </div>

            <div class="space-y-2">
              <label class="text-slate-700 font-extrabold block">Passwort</label>
              <input [(ngModel)]="password" name="password" type="password" required
                     class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                            placeholder:text-slate-400 shadow-sm transition
                            focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white"
                     placeholder="••••••••" />
            </div>

            <button type="submit"
                    class="w-full py-3.5 rounded-2xl font-extrabold tracking-wide text-white
                           bg-gradient-to-r from-sky-500 via-sky-600 to-red-500
                           shadow-lg shadow-sky-500/20 transition duration-200
                           hover:brightness-110 hover:-translate-y-0.5
                           active:translate-y-0 active:scale-[0.99]">
              Sich einloggen
            </button>
          </form>

          <div *ngIf="loginError"
               class="mt-5 rounded-2xl bg-white/70 ring-1 ring-red-200/70 p-4 text-center animate-shake">
            <div class="font-extrabold text-red-600">Etwas ist schiefgelaufen</div>
            <div class="text-sm text-slate-600 mt-1">Bitte prüfen Sie Email & Passwort.</div>
          </div>

          <div class="text-center text-slate-600 mt-8 text-sm">
            Haben Sie noch kein Konto?
            <a routerLink="/register"
               class="text-sky-700 hover:text-sky-600 font-bold underline ml-1">
              Jetzt registrieren
            </a>
          </div>

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

    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      50% { transform: translateX(8px); }
      75% { transform: translateX(-8px); }
      100% { transform: translateX(0); }
    }
    .animate-shake {
      animation: shake 0.35s ease-in-out;
    }
  `]
})
export class UserLogin {
  username = '';
  password = '';
  loginError = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    this.loginError = false;

    this.userService.login({
      email: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.userService.saveToken(res.token);
        localStorage.setItem('userId', res.id.toString());
        this.router.navigate(['/']);
      },
      error: () => {
        this.loginError = true;
      }
    });
  }
}

