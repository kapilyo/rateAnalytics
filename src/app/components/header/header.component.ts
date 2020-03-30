import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }
   title =  JSON.parse(localStorage.getItem('currentUser')).username;
  ngOnInit(): void {
  }

  onLogout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  };

}
