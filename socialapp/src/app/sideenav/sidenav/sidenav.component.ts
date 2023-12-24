import { Component, HostListener,Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
//import { LoginComponent } from '@app/login/login.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() logoutClicked = new EventEmitter<void>();
  profilePicture?: string;

  isLoggedIn: boolean = true; // Initialize with the actual initial state
  username: string = '';
  useridd=this.sharedService.getThirdSharedVariable();
  constructor(private router: Router,private sharedService: SharedService,private http: HttpClient) {}
  ngOnInit() {
    // Use the service to get the shared variable
    this.username = this.sharedService.getSharedVariable();
    console.log(this.username);
    this.http.get(`http://localhost/freshstart/socialapp/src/app/profile/profile/getprofile.php?UserID=${this.useridd}`)
    .subscribe((response: any) => {
      console.log(response);
      if (response && response.path) {
        this.profilePicture = response.path;
      }
    }, error => {
      console.error(error);
    });

  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  navigateToGroups() {
    this.router.navigate(['/groups']);
  }
  navigateToFriends() {
    this.router.navigate(['/friends']);
  }

  onLogoutClick() {
    this.logoutClicked.emit();
    localStorage.removeItem('profilePicture');
  }

  @HostListener('window:click', ['$event'])
  closeSidenav(event: Event): void {
    const targetElement = event.target as HTMLElement;

    // Check if the clicked element is a link inside the sidenav
    if (targetElement.matches('.app-sidenav span')) {
      // Check if the screen width is between 320px and 768px
      const screenWidth = window.innerWidth;
      if (screenWidth >= 320 && screenWidth <= 768) {
        // Add the logic to close the sidenav here
        const sidenavElement = document.getElementById('navbarSupportedContent22');
        if (sidenavElement && sidenavElement.classList.contains('show')) {
          sidenavElement.classList.remove('show');
        }
      }
    }
  }

}
