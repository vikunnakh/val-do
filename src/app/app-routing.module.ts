import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/auth.guard';
import { AuthGuard } from './guards/login.guard';
import { VerifyGuard } from './guards/verify.guard';

const routes: Routes = [
  {
		path: "",
		loadChildren: () => import("./modules/main/main.module").then((m) => m.MainModule),
	},
	{
		path: "auth",
		loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule),
		// canActivate: [LoginGuard],
	},
	{
		path: "registration",
		loadChildren: () => import("./modules/registration/registration.module").then((m) => m.RegistrationModule),
		// canActivate: [LoginGuard],
	},
	{
		path: "verify",
		loadChildren: () => import("./modules/verify/verify.module").then((m) => m.VerifyModule),
		// canActivate: [VerifyGuard],
	},
	{
		path: "reset",
		loadChildren: () => import("./modules/reset/reset.module").then((m) => m.ResetModule),
		// canActivate: [LoginGuard],
	},
	{
		path: "set-password",
		loadChildren: () => import("./modules/set-password/set-password.module").then((m) => m.SetPasswordModule),
		// canActivate: [LoginGuard],
	},
	{
		path: "lessons",
		loadChildren: () => import("./modules/lesson/lesson.module").then((m) => m.LessonModule),
	},
	{
		path: "tag",
		loadChildren: () => import("./modules/tags/tags.module").then((m) => m.TagsModule),
	},
	{
		path: "categories",
		loadChildren: () => import("./modules/categories/categories.module").then((m) => m.CategoriesModule),
	},
	{
		path: "challenge",
		loadChildren: () => import("./modules/challange/challange.module").then((m) => m.ChallangeModule),
	},
	{
		path: "quiz-list",
		loadChildren: () => import("./modules/quiz-list/quiz-list.module").then((m) => m.QuizListModule),
	},
	{
		path: "quiz",
		loadChildren: () => import("./modules/quiz-detail/quiz-detail.module").then((m) => m.QuizDetailModule),
	},
	{
		path: "reviews",
		loadChildren: () => import("./modules/reviews/reviews.module").then((m) => m.ReviewsModule),
	},
	{
		path: "converters",
		loadChildren: () => import("./modules/converters/converters.module").then((m) => m.ConvertersModule),
	},
	{
		path: "resume",
		loadChildren: () => import("./modules/cv/cv.module").then((m) => m.CvModule),
	},
	/* blog */
	{
		path: "blog",
		loadChildren: () => import("./modules/blog/blog.module").then((m) => m.BlogModule),
	},
	/* profile */
	{
		path: "profile",
		loadChildren: () => import("./modules/profile/profile.module").then((m) => m.ProfileModule),
		// canActivate: [AuthGuard],
	},
	{
		path: "favorites",
		loadChildren: () => import("./modules/favorites/favorites.module").then((m) => m.FavoritesModule),
		// canActivate: [AuthGuard],
	},
	/* admin */
	{
		path: "admin",
		loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
	},
	{ path: "**", redirectTo: "" },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
