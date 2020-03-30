import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  public users = [
    {
      username: 'test',
      password: 'test',
      layout: [
        { id: 'a1', cols: 5, rows: 5, y: 0, x: 0, title: 'test item A1' },
        { id: 'a2', cols: 5, rows: 5, y: 5, x: 0, title: 'test item A2' },
        { id: 'a3', cols: 5, rows: 5, y: 0, x: 5, title: 'test item A3' },
        { id: 'a4', cols: 5, rows: 5, y: 5, x: 5, title: 'test item A4' },
        { id: 'a5', cols: 5, rows: 5, y: 0, x: 5, title: 'test item A5' },
        { id: 'a6', cols: 5, rows: 5, y: 5, x: 5, title: 'test item A6' }]
    },
    {
      username: 'james',
      password: 'james',
      layout: [
        { id: 'a1', cols: 2, rows: 1, y: 0, x: 0, title: 'James item A1' },
        { id: 'a2', cols: 2, rows: 1, y: 0, x: 2, title: 'James item A2' },
        { id: 'a3', cols: 2, rows: 1, y: 0, x: 0, title: 'James item A3' },
        { id: 'a4', cols: 2, rows: 1, y: 0, x: 2, title: 'James item A4' }]
    }
  ];

  constructor() { }

  authenticateUser(user): boolean {
    var isValidUser = false;
    this.users.find(function (u) {
      if (user.username == u.username && user.password == u.password) {
        localStorage.setItem('currentUser', JSON.stringify(u));
        isValidUser = true;
      }
    })
    return isValidUser;
  }

}
