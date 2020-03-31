import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  public users = [
    {
      username: 'test',
      password: 'test',
      layout: [
        { id: 'a1', cols: 5, rows: 5, y: 0, x: 0, title: 'test item A1', gridtype: '', gridData: 'aaa' },
        { id: 'a2', cols: 5, rows: 5, y: 5, x: 0, title: 'test item A2', gridtype: '', gridData: 'aa' },
        { id: 'a3', cols: 5, rows: 5, y: 0, x: 5, title: 'test item A3', gridtype: '', gridData: 'aa' },
        { id: 'a4', cols: 5, rows: 5, y: 5, x: 5, title: 'test item A4', gridtype: '', gridData: 'aaa' },
        { id: 'a5', cols: 5, rows: 5, y: 0, x: 5, title: 'test item A5', gridtype: '', gridData: 'aa' },
        { id: 'a6', cols: 5, rows: 5, y: 5, x: 5, title: 'test item A6', gridtype: '', gridData: '' }]

    },
    {
      username: 'james',
      password: 'james',
      layout: [
        { id: 'a1', cols: 2, rows: 1, y: 0, x: 0, title: 'James item A1', gridtype: '', gridData: '' },
        { id: 'a2', cols: 2, rows: 1, y: 0, x: 2, title: 'James item A2', gridtype: '', gridData: '' },
        { id: 'a3', cols: 2, rows: 1, y: 0, x: 0, title: 'James item A3', gridtype: '', gridData: '' },
        { id: 'a4', cols: 2, rows: 1, y: 0, x: 2, title: 'James item A4', gridtype: '', gridData: '' }],

    },
    {
      username: 'smith',
      password: 'smith',
      layout: [
        { id: 'a1', cols: 2, rows: 1, y: 0, x: 0, title: 'James item A1', gridtype: 'iframe', gridData: 'https://app.powerbi.com/reportEmbed?reportId=39da5463-5535-4074-9afe-89ecfde89080&groupId=232a0e3f-dcca-41d9-98cb-aa8418aefc78&autoAuth=true&ctid=13085c86-4bcb-460a-a6f0-b373421c6323&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9' }],


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
