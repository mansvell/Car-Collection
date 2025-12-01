import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `

    <div class="min-h-screen flex items-center justify-center px-4"> <!--min-h-screen= 100% ecran -->

      <div class="w-full max-w-md p-8 rounded-2xl  bg-white/10 backdrop-blur-xl
              border border-white/20 shadow-2xl animate-fadeIn">

        <h1 class="text-center text-3xl font-bold text-white mb-6 tracking-wide">Verbindung</h1>

        <p class="text-center text-slate-300 mb-10 text-sm">loggen Sie sich ein , um Favoris zu verwalten</p>

        <form (ngSubmit)="login()" class="space-y-6">

          <div>
            <label class="text-slate-200 font-medium mb-1 block">Email</label>
            <input [(ngModel)]="username" name="username" required
              class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                 placeholder-slate-400 border  focus:ring-4 focus:ring-cyan-400 transition"
              placeholder="example@gmail.com" />
          </div>

          <div>
            <label class="text-slate-200 font-medium mb-1 block">Passwort</label>
            <input
              [(ngModel)]="password" name="password" type="password" required class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                 placeholder-slate-400 border focus:ring-4 focus:ring-cyan-400 transition"
              placeholder="••••••••"/>
          </div>

          <button
            type="submit"
            class="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wide
               shadow-lg hover:shadow-cyan-500/40 transition cursor-pointer duration-200">
            Sich einloggen
          </button>
        </form>

        <!-- Error message -->
        <div *ngIf="loginError"
             class="text-center text-red-400 font-medium mt-5 animate-shake">Etwas ist schiefgelaufen</div>

        <div class="text-center text-slate-300 mt-8 text-sm">
          Haben Sie noch kein Konto?
          <a routerLink="/register" class="text-cyan-400 hover:text-cyan-300 cursor-pointer underline ml-1">
            Jetzt registrieren
          </a>
        </div>

      </div>

      </div>
  `,
  styles: [`
    /* Fade-in animation */
    .animate-fadeIn {
      animation: fadeIn 0.8s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Shake animation on wrong login */
    .animate-shake {
      animation: shake 0.3s ease-in-out;
    }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      50% { transform: translateX(8px); }
      75% { transform: translateX(-8px); }
      100% { transform: translateX(0); }
    }
  `]
})
export class UserLogin {

  username = '';
  password = '';
  loginError = false;

  constructor(private router: Router) {}

  login() {
    // Pour l’instant on simule uniquement
    if (this.username === 'user' && this.password === '1234') {
      this.loginError = false;
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }
}

