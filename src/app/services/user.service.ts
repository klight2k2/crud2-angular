import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../users/list-users/list-users.component';
import { TokenStorageService } from './token-storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': 'http://localhost:3000'}),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3000/api/';
  token: string = '';
  private CurrentUserSource = new BehaviorSubject('');
  CurrentUser = this.CurrentUserSource.asObservable();
  changeUser(username: string) {
    this.CurrentUserSource.next(username);
  }
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  isLogined() {
    if (this.tokenStorage.getToken()) return true;
    else return false;
  }
  listUsers(): Observable<User[]> {
    this.token = this.tokenStorage.getToken() || '';
    return this.http.get<User[]>(this.baseUrl + 'users/' + 'findall');
  }
  viewUsers(id: string) {
    this.token = this.tokenStorage.getToken() || '';
    return this.http.get<User>(this.baseUrl + 'users/' + id + '/find');
  }
  addUser(userObj: User) {
    this.token = this.tokenStorage.getToken() || '';
    return this.http.post<User>(this.baseUrl + 'auth/register', userObj);
  }
  deleteUser(id: any) {
    this.token = this.tokenStorage.getToken() || '';
    console.log('deleteUser', id);
    return this.http.delete(this.baseUrl + 'users/' + id + '/delete');
  }
  updateUser(userObj: any, id: any) {
    console.log('update', userObj);
    const formdata = new FormData();
    formdata.append('username', userObj.username);
    formdata.append('image', userObj.image);
    formdata.append('email', userObj.email);
    formdata.append('oldPassword', userObj.oldPassword);
    formdata.append('newPassword', userObj.newPassword);
    this.token = this.tokenStorage.getToken() || '';
    console.log('formdata ', formdata);
    return this.http.put<User>(this.baseUrl + 'users/' + id, formdata);
  }
}
