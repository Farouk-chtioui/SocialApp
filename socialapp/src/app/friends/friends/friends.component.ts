import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friends = [
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
    { name: 'John', bio: 'Lorem ipsum dolor sit amet' ,img: '../../assets/images/drac.png' },
  ];
}

