import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Brand } from './pages/brand/brand';
import { UserLogin } from './pages/user-login/user-login';
import {AdminCarForm} from './pages/admin/admin-car-form/admin-car-form';
import { AdminCarsList} from './pages/admin/admin-cars-list/admin-cars-list';
import { AdminDashboard} from './pages/admin/admin-dashboard/admin-dashboard';
import {Suggest} from './pages/suggest/suggest';
import {Favorites} from './pages/favorites/favorites';
import {AdminLogin} from './pages/admin/admin-login/admin-login';

export const routes: Routes = [
  { path:'' , component:Home},
  { path: 'brand/:id', component: Brand },
  { path: 'userlogin', component: UserLogin },
  {path: 'suggest', component: Suggest},
  { path: 'favorites', component: Favorites },
  { path: 'admin/login', component: AdminLogin },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminDashboard },
      { path: 'cars', component: AdminCarsList },
      { path: 'cars/new', component: AdminCarForm },
      { path: 'cars/:id/edit', component: AdminCarForm },
    ]
  },
  { path: '**', redirectTo: '' }// falls Route unbekannt ist → home
];
