import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div class="w-full max-w-lg animate-page-enter">

        <div class="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/70
                    shadow-[0_25px_70px_-45px_rgba(2,6,23,0.45)]
                    p-7 sm:p-8">

          <div class="text-center">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2
                        ring-1 ring-slate-200/70 shadow-sm backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-sky-500"></span>
              <span class="text-xs font-bold tracking-widest text-slate-600 uppercase">Register</span>
              <span class="text-xs font-black text-red-500">•</span>
              <span class="text-xs font-semibold text-slate-500">Account</span>
            </div>

            <h1 class="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Registrierung <span class="text-sky-600">starten</span>
            </h1>

            <p class="mt-2 text-slate-600 text-sm">
              Erstellen Sie Ihr persönliches Konto
            </p>
          </div>

          <form (ngSubmit)="regist()" class="mt-8 space-y-5">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-slate-700 font-extrabold block">Vorname</label>
                <input [(ngModel)]="form.vorname" name="vorname" required
                       placeholder="Mec"
                       class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                              placeholder:text-slate-400 shadow-sm transition
                              focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white" />
              </div>

              <div class="space-y-2">
                <label class="text-slate-700 font-extrabold block">Nachname</label>
                <input [(ngModel)]="form.nachname" name="nachname" required
                       placeholder="Bien"
                       class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                              placeholder:text-slate-400 shadow-sm transition
                              focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-slate-700 font-extrabold block">Email</label>
              <input [(ngModel)]="form.email" name="email" type="email" required
                     placeholder="example@gmail.com"
                     class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                            placeholder:text-slate-400 shadow-sm transition
                            focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-slate-700 font-extrabold block">Passwort</label>
                <input [(ngModel)]="form.password" name="password" type="password" required
                       placeholder="••••••••"
                       class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                              placeholder:text-slate-400 shadow-sm transition
                              focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white" />
              </div>

              <div class="space-y-2">
                <label class="text-slate-700 font-extrabold block">Passwort erneut</label>
                <input [(ngModel)]="form.password2" name="password2" type="password" required
                       placeholder="••••••••"
                       class="w-full rounded-2xl bg-white/60 ring-1 ring-slate-200/70 px-4 py-3 text-slate-800
                              placeholder:text-slate-400 shadow-sm transition
                              focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white" />
              </div>
            </div>

            <button type="submit"
                    [disabled]="loading"
                    class="w-full py-3.5 rounded-2xl font-extrabold tracking-wide text-white
                           bg-gradient-to-r from-sky-500 via-sky-600 to-red-500
                           shadow-lg shadow-sky-500/20 transition duration-200
                           hover:brightness-110 hover:-translate-y-0.5
                           active:translate-y-0 active:scale-[0.99]
                           disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
              {{ loading ? 'Bitte warten…' : 'Registrieren' }}
            </button>
          </form>

          <!-- Error -->
          <div *ngIf="error"
               class="mt-5 rounded-2xl bg-white/70 ring-1 ring-red-200/70 p-4 text-center animate-shake">
            <div class="font-extrabold text-red-600">{{ error }}</div>
          </div>

          <div *ngIf="success"
               class="mt-5 rounded-2xl bg-white/70 ring-1 ring-emerald-200/70 p-4 text-center animate-pop">
            <div class="font-extrabold text-emerald-700">Konto erfolgreich erstellt</div>
            <div class="text-sm text-slate-600 mt-1">Weiterleitung zum Login…</div>
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
    .animate-shake { animation: shake 0.35s ease-in-out; }

    @keyframes pop {
      0% { opacity: 0; transform: translateY(10px) scale(.96); }
      70% { opacity: 1; transform: translateY(0) scale(1.02); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-pop { animation: pop 360ms cubic-bezier(.16,1,.3,1) both; }
  `]
})
export class Register {
  form = {
    vorname: '',
    nachname: '',
    email: '',
    password: '',
    password2: ''
  };

  loading = false;
  error = '';
  success = false;

  constructor(private api: UserService, private router: Router) {}

  regist() {
    this.error = '';
    this.success = false;

    if (this.form.password !== this.form.password2) {
      this.error = 'Die Passwörter stimmen nicht überein.';
      return;
    }

    this.loading = true;

    const payload = {
      vorname: this.form.vorname,
      nachname: this.form.nachname,
      email: this.form.email,
      password: this.form.password
    };

    this.api.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => this.router.navigate(['/userlogin']), 1000);
      },
      error: () => {
        this.loading = false;
        this.error = 'Fehler beim Registrieren';
      }
    });
  }
}
