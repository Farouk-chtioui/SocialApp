// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string): void {
    // Implement your login logic here
    console.log(`Logging in with username: ${username} and password: ${password}`);
  }
}
