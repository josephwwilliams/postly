import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post, PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  public post: Post | null = null;

  private postSubscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.postSubscription.add(
        this.postService.getPost({ id }).subscribe((response) => {
          this.post = response.post;
        })
      );
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
