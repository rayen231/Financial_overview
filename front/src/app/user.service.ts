import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Create a BehaviorSubject to hold the user ID
  private userIdSource = new BehaviorSubject<number | null>(null);

  // Observable for components to subscribe to the user ID
  userId$ = this.userIdSource.asObservable();

  constructor() {}

  // Method to set the user ID
  setUserId(id: number | null): void {
    this.userIdSource.next(id);  // Corrected to use `userIdSource`
  }

  // Method to get the current user ID
  getUserId(): number | null {
    return this.userIdSource.value;
  }
}
