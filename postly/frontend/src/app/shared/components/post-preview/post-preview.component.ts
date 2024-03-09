import { Component, Input } from '@angular/core';
import { Post } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent {
  @Input() post: Post | null = null;
}
