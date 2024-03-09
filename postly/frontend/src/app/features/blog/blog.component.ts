import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blog, BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  public blog: Blog | null = null;

  private blogSubscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const username = params.get('username');
      if (!username) return;

      this.blogSubscription.add(
        this.blogService.blog({ username }).subscribe((response) => {
          this.blog = response;
        })
      );
    });
  }

  ngOnDestroy() {
    this.blogSubscription.unsubscribe();
  }
}
