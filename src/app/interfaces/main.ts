import { Blog } from "./blog";
import { Category } from "./category";
import { Review } from "./review";


export interface Main {
    reviews: Review[];
    categories: Category[];
    blogs: Blog[];
}
