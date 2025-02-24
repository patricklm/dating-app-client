import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  baseUrl = env.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + '/users');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + '/users/' + username);
  }
}
