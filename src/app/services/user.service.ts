import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  public users = [
    { username: 'test', password: 'test', layout: '' },
    { username: 'james', password: 'james', layout: '' }
  ];

  constructor() { }

  authenticateUser(user): boolean {
    var isValidUser = false;
    this.users.find(function(u){
        if(user.username == u.username && user.password == u.password){
          localStorage.setItem('currentUser', JSON.stringify(u));
          isValidUser =  true;
        }
    })
    return isValidUser;
  }

}
