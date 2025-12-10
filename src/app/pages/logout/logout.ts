import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../api/user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center
                bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
                text-white px-4 animate-fadeIn">

      <h1 class="text-3xl font-bold mb-4">Sie haben sich ausgeloggt</h1>

      <p class="text-slate-300 mb-8 text-center">
        Vielen Dank, dass Sie CarCollection genutzt haben
      </p>

      <a routerLink="/"
         class="px-6 py-3 bg-cyan-500 hover:bg-cyan-400
                text-black font-semibold rounded-xl shadow transition">
        sich einloggen?
      </a>

    </div>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn .7s ease forwards;
    }
    @keyframes fadeIn {
      from {opacity:0; transform:translateY(20px);}
      to   {opacity:1; transform:translateY(0);}
    }
  `]
})
export class Logout {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Déconnexion user simple
    this.userService.logout();
  }
}
