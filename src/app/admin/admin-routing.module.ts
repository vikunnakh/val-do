import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AddEditChallangeComponent } from './pages/add-edit-challange/add-edit-challange.component';
import { AddComponent } from './pages/add/add.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditComponent } from './pages/edit/edit.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { TagsComponent } from './pages/tags/tags.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: "add", component: AddComponent, canActivate: [AdminGuard] },
	{ path: "blog", component: BlogComponent, canActivate: [AdminGuard] },
	{ path: "edit/:id", component: EditComponent, canActivate: [AdminGuard] },
	{ path: "users", component: UsersComponent, canActivate: [AdminGuard] },
	{ path: "tags", component: TagsComponent, canActivate: [AdminGuard] },
	{
		path: "categories",
		component: CategoriesComponent,
		canActivate: [AdminGuard],
	},
	{
		path: "challenge",
		component: AddEditChallangeComponent,
		canActivate: [AdminGuard],
	},
	{ path: "quiz", component: QuizComponent, canActivate: [AdminGuard] },
	{ path: "reviews", component: ReviewsComponent, canActivate: [AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
