import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Post {
  _id: string;
  title: string;
  content: string;
  createdBy: {
    id: string;
    username: string;
  };
  createdAt: string;
}

export interface CreatePost {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  createPost({ title, content }: CreatePost) {
    return this.httpClient.post<{ post: Post }>(
      `${environment.API_URL}/api/v1/posts/create`,
      { title, content }
    );
  }

  getPost({ id }: { id: string }) {
    return this.httpClient.get<{ post: Post }>(
      `${environment.API_URL}/api/v1/posts/${id}`
    );
  }

  getPosts() {
    return this.httpClient.get<{ posts: Post[] }>(
      `${environment.API_URL}/api/v1/posts`
    );
  }
}
