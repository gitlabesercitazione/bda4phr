import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
// import { AuthService } from 'angular-6-social-login';
import { User } from '../models';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // public data: any;
  // public userData: any;
  currentUser: User;
  users: User[] = [];

  constructor(
    // public user: UserService,
    // public socialAuthService: AuthService,
    private userService: UserService
  ) {
    // this.userData = this.user.getData();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();

    // this.user.sessionOut();
  }

  // logout() {
  //   this.socialAuthService.signOut().then(data => {
  //     this.user.logOut();
  //   });
  // }


  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllUsers() 
    });
}

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => { 
        this.users = users; 
    });
}
}
