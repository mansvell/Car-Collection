import { Component, signal } from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import {UserService} from './api/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, RouterLinkActive ], //nötig ,damit die Navigation richtig funktioniert (RL, RLA)
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',

})
export class App {
  protected readonly title = signal('CarCollectionFrontend');
  //Mobile menu
  menuOpen = signal(false);

  constructor(
    public userService: UserService, //public => utilisable dans app.html
    private router: Router
  ) {}

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
