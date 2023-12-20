import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedVariable: string = '';  // Initialize sharedVariable with an empty string
  private secondSharedVariable: string = '';  // Initialize sharedVariable with an empty string
  private thirdSharedVariable: number=0;  // Initialize sharedVariable with an empty string

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
}