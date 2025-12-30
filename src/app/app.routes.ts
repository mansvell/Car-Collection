import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Autos } from './pages/autos/autos';
import { UserLogin } from './pages/user-login/user-login';
import { AdminDashboard} from './pages/admin/admin-dashboard/admin-dashboard';
import {Suggest} from './pages/suggest/suggest';
import {AdminLogin} from './pages/admin/admin-login/admin-login';
import {Register} from './pages/register/register';
import {Logout} from './pages/logout/logout';

export const routes: Routes = [
  { path:'' , component:Home},
  { path: 'autos', component: Autos },
  { path: 'userlogin', component: UserLogin },
  { path: 'register', component: Register },
  {path: 'suggest', component: Suggest},
  { path: 'logout', component: Logout },
  {
    path: 'admin',  //gleich wie admin/cars/adminentschd oder admin/admindashb
    children: [
      { path: '', component: AdminLogin },
      { path: 'admindashb', component: AdminDashboard }
    ]
  },
  { path: '**', redirectTo: '' }// falls Route unbekannt ist → home
];
