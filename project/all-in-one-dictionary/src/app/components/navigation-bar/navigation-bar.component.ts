import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  collapse = true;
  loggedIn = false;
  


  constructor(private authService: AuthService, private router: Router) { 

    authService.authorized.subscribe(
      (data:any) => {
        this.loggedIn = data;
      }
    )

  }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.clear();
    this.authService.authorized.next(false);
    this.router.navigate(['']);
  }

}
