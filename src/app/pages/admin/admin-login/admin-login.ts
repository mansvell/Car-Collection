import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  template: `

    <div class="min-h-screen flex items-center justify-center px-4
                bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      <div class="w-full max-w-md p-8 rounded-2xl
                  bg-white/10 backdrop-blur-xl
                  border border-white/20 shadow-2xl animate-fadeIn">

        <!-- Admin icon -->
        <div class="flex justify-center mb-6">
          <div class="w-14 h-14 bg-blue-500/30 rounded-full flex items-center justify-center">
            <span class="text-3xl text-blue-400">⚙️</span>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-center text-3xl font-bold text-white mb-6 tracking-wide">
          Admin Login
        </h1>

        <p class="text-center text-slate-300 mb-8 text-sm">
          Zugang nur für Administratoren.
        </p>

        <!-- FORM -->
        <form class="space-y-6">

          <!-- Username -->
          <div>
            <label class="text-slate-200 font-medium mb-1 block">Admin Benutzername</label>
            <input
              class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                     placeholder-slate-400 border border-white/20
                     focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="admin" />
          </div>

          <!-- Password -->
          <div>
            <label class="text-slate-200 font-medium mb-1 block">Passwort</label>
            <input
              type="password"
              class="w-full px-4 py-3 rounded-xl bg-white/10 text-slate-100
                     placeholder-slate-400 border border-white/20
                     focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="••••••••"/>
          </div>

          <!-- Login Button -->
          <button
            type="button"
            class="w-full py-3 rounded-xl
                   bg-blue-500 hover:bg-blue-400
                   text-black font-semibold tracking-wide
                   shadow-lg hover:shadow-blue-500/40
                   transition duration-200">
            Einloggen
          </button>

        </form>

      </div>
    </div>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn 0.8s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AdminLogin {}
