import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreatePost, PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  public postForm = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  private postSubscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  submit() {
    if (this.postForm.invalid) return;

    const formValue = this.postForm.getRawValue() as CreatePost;

    this.postSubscription.add(
      this.postService.createPost(formValue).subscribe((response) => {
        this.router.navigate(['/', 'post', response.post._id]);
      })
    );
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
