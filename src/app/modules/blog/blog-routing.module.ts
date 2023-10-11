import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogDetailComponent } from "src/app/pages/blog-detail/blog-detail.component";
import { BlogListComponent } from "src/app/pages/blog-list/blog-list.component";

const routes: Routes = [
	{ path: "list", component: BlogListComponent },
	{ path: "blog-detail/:id", component: BlogDetailComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BlogRoutingModule {}
