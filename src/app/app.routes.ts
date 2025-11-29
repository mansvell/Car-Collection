import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Brand } from './pages/brand/brand';
import { Login } from './pages/login/login';
import {AdminCarForm} from './pages/admin/admin-car-form/admin-car-form';
import { AdminCarsList} from './pages/admin/admin-cars-list/admin-cars-list';
import { AdminDashboard} from './pages/admin/admin-dashboard/admin-dashboard';
import {Suggest} from './pages/suggest/suggest';
import {Favorites} from './pages/favorites/favorites';

export const routes: Routes = [
  { path:'' , component:Home},
  { path: 'brand/:id', component: Brand },
  { path: 'login', component: Login },
  {path: 'suggest', component: Suggest},
  { path: 'favorites', component: Favorites },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminDashboard },
      { path: 'cars', component: AdminCarsList },
      { path: 'cars/new', component: AdminCarForm },
      { path: 'cars/:id/edit', component: AdminCarForm },
    ]
  },
  { path: '**', redirectTo: '' }
];
