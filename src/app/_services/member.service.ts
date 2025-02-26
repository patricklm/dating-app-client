import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  baseUrl = env.apiUrl;

  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + '/users').subscribe({
      next: (result) => this.members.set(result),
    });
  }

  getMember(username: string) {
    const member = this.members().find((m) => m.username === username);
    if (member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + '/users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + '/users', member).pipe(
      tap(() => {
        this.members.update((members) =>
          members.map((m) => (m.username === member.username ? member : m))
        );
      })
    );
  }
}
