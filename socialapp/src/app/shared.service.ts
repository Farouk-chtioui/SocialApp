import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedVariable: string = '';  // Initialize sharedVariable with an empty string
  private secondSharedVariable: string = '';  // Initialize sharedVariable with an empty string
  private thirdSharedVariable: number=0;  // Initialize sharedVariable with an empty string
  private profilePictureSource = new BehaviorSubject(localStorage.getItem('profilePicture') || 'assets/images/profilepic.png');
    currentProfilePicture = this.profilePictureSource.asObservable();
  constructor() { }
setThirdSharedVariable(value: number) {
    this.thirdSharedVariable = value;
  }
  setSharedVariable(value: string) {
    this.sharedVariable = value;
  }
  setSecondSharedVariable(value: string) {
    this.secondSharedVariable = value;
  }

  getSharedVariable() {
    return this.sharedVariable;
  }
  getSecondSharedVariable() {
    return this.secondSharedVariable;
  }
  getThirdSharedVariable() {
    return this.thirdSharedVariable;
  }
  changeProfilePicture(profilePicture: string) {
    this.profilePictureSource.next(profilePicture);
    localStorage.setItem('profilePicture', profilePicture);
  }
}