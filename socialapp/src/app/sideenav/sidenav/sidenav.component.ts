import { Component, HostListener,Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { LoginComponent } from '@app/login/login.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() logoutClicked = new EventEmitter<void>();

  isLoggedIn: boolean = true; // Initialize with the actual initial state

  constructor(private router: Router) {}

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
