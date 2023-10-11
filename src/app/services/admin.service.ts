import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  isAdmin(): Boolean {
    if (localStorage.getItem('user')) {
      const user: User = JSON.parse(localStorage.getItem('user')!);
      return user.isAdmin;
    }
    return false;
  }
}
