import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.service';
import { environment } from 'src/environments/environment';

export interface Blog {
  user: {
    username: string;
    createdAt: Date;
  };
  totalPosts: number;
  posts: Post[];
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: HttpClient) {}

  blog({ username }: { username: string }) {
    return this.httpClient.get<Blog>(
      `${environment.API_URL}/api/v1/blog/${username}`
    );
  }
}
