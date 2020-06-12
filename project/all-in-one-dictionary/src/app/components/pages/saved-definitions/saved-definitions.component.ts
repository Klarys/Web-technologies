import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-saved-definitions',
  templateUrl: './saved-definitions.component.html',
  styleUrls: ['./saved-definitions.component.css']
})
export class SavedDefinitionsComponent implements OnInit {
  logedIn=false;

  constructor(private authService: AuthService) {
    console.log(authService.isLogedIn())
    this.logedIn = authService.isLogedIn();
   }

  ngOnInit(): void {
  }

}
