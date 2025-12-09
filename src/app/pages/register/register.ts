import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../api/user.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4">

      <div class="w-full max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-xl
                  border border-white/20 shadow-2xl animate-fadeIn">

        <h1 class="text-center text-3xl font-bold text-white mb-6">Registrierung</h1>

        <p class="text-center text-slate-300 mb-8 text-sm">Erstellen Sie Ihr persönliches Konto </p>

        <form (ngSubmit)="regist()" class="space-y-6">
          <div>
            <label class="text-slate-200 mb-1 block">Vorname</label>
            <input [(ngModel)]="form.vorname" name="vorname" required
                   class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                          border border-white/20 focus:ring-4 focus:ring-cyan-400"/>
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Nachname :</label>
            <input [(ngModel)]="form.nachname" name="nachname" required
                   class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                          border border-white/20 focus:ring-4 focus:ring-cyan-400"/>
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Email :</label>
            <input [(ngModel)]="form.email" name="email" type="email" required
                   class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                          border border-white/20 focus:ring-4 focus:ring-cyan-400"/>
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Passwort :</label>
            <input [(ngModel)]="form.password" name="password" type="password" required
                   class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                          border border-white/20 focus:ring-4 focus:ring-cyan-400"/>
          </div>

          <div>
            <label class="text-slate-200 mb-1 block">Passwort erneut eingeben :</label>
            <input [(ngModel)]="form.password2" name="password2" type="password" required
                   class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                          border border-white/20 focus:ring-4 focus:ring-cyan-400"/>
          </div>

          <button type="submit"
                  class="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 cursor-pointer
                         text-black font-semibold shadow-lg transition">
            Registrieren
          </button>
        </form>

        <div *ngIf="error" class="text-center text-red-400 font-semibold mt-5">
          Die Passwörter stimmen nicht überein.
        </div>

        <div *ngIf="success" class="text-center text-green-400 font-semibold mt-5">
          Konto erfolgreich erstellt ✔️
        </div>

      </div>
    </div>
  `,
  standalone: true,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn 0.8s ease forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class Register {
  form = {
    vorname: '',
    nachname: '',
    email: '',
    password: '',
    password2: ''   // ← AJOUT ESSENTIEL
  };

  loading = false;
  error = '';
  success = false;   // ← NECESSAIRE pour ton *ngIf="success"

  constructor(private api: UserService, private router: Router) {}

  regist() {   // ← Le nom doit correspondre à (ngSubmit)="register()"
    this.error = '';

    // Vérifier mots de passe
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
        this.success = true;

        // Rediriger après 1 seconde
        setTimeout(() => this.router.navigate(['/userlogin']), 1000);
      },
      error: () => {
        this.error = 'Fehler beim Registrieren';
        this.loading = false;
      }
    });
  }
}
