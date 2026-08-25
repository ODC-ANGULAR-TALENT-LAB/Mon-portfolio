import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface GithubRepoNode {
  id: string;
  name: string;
  description: string;
  url: string;
  forkCount: number;
  diskUsage: number;
  stargazers: { totalCount: number };
  primaryLanguage: { name: string; color: string } | null;
}

export interface GithubRepoEdge {
  node: GithubRepoNode;
}

export interface GithubProfile {
  id?: string;
  name: string;
  bio: string;
  avatarUrl: string;
  location: string | null;
  hireable?: string;
  pinnedItems: { edges: GithubRepoEdge[] };
}

export interface MediumItem {
  link: string;
  title: string;
  content: string;
}

/**
 * profile.json et blogs.json sont produits au build par fetch.js et servis
 * depuis public/. Les deux appels echouent silencieusement si les fichiers
 * sont absents : les sections retombent alors sur les donnees de portfolio.ts.
 */
@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<{ data: { user: GithubProfile } }> {
    return this.http.get<{ data: { user: GithubProfile } }>('/profile.json');
  }

  getMediumBlogs(): Observable<{ items: MediumItem[] }> {
    return this.http.get<{ items: MediumItem[] }>('/blogs.json');
  }
}
