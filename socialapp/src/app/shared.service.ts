import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedVariable: string = '';  // Initialize sharedVariable with an empty string
  private secondSharedVariable: string = '';  // Initialize sharedVariable with an empty string

  constructor() { }

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
}