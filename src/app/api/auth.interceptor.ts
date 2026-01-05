import { HttpInterceptorFn } from '@angular/common/http';
import {UserService} from './user.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);
  const token = userService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

