import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedVariable: string = '';  // Initialize sharedVariable with an empty string
  private secondSharedVariable: string = '';  // Initialize sharedVariable with an empty string
  private thirdSharedVariable: number=0;  // Initialize sharedVariable with an empty string
  private profilePictureSource = new BehaviorSubject(localStorage.getItem('profilePicture') || 'assets/images/profilepic.png');
    currentProfilePicture = this.profilePictureSource.asObservable();

  constructor(private http: HttpClient) { }

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
  getPofilePicture() {
    return this.profilePictureSource;
  }

  searchUsers(searchText: string): Observable<any[]> {
    // replace 'your-api-url' with the actual API URL
    return this.http.get<any[]>(`http://localhost/freshstart/socialapp/src/app/navbar/navbar/navbar.php?search=${searchText}`);
  }
}
