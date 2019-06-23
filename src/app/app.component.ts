import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  
  title = 'BookClub';
  loggedIn: boolean;

  ngOnInit() {
   this.loggedIn = false;
  }

    get userjwt(): any {
        return sessionStorage.getItem('user-jwt');
    }
    check() {
    this.ngOnInit();
      if (this.userjwt != null) {
        this.router.navigateByUrl('blank').then(() => {
          this.router.navigateByUrl('/Member');
        });
      } else {
        this.router.navigate(['/Home']);
      }
    }
}
