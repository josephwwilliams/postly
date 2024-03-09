import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { PostComponent } from './features/post/post.component';
import { BlogComponent } from './features/blog/blog.component';
import { PostCreateComponent } from './features/post/post-create/post-create.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'blog',
    children: [
      {
        path: ':username',
        component: BlogComponent,
      },
    ],
  },
  {
    path: 'post',
    children: [
      {
        path: 'create',
        pathMatch: 'full',
        component: PostCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: PostComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
