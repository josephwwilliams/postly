import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public posts: Post[] = [];

  private postsSubscription = new Subscription();

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postsSubscription.add(
      this.postService.getPosts().subscribe((response) => {
        this.posts = response.posts;
      })
    );
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
