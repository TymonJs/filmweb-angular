import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/post';

@Pipe({
  name: 'sortedPosts'
})
export class SortedPostsPipe implements PipeTransform {

  transform(posts: Post[]): Post[] {
    posts.sort((a,b) => a.createdAt>b.createdAt? 1: -1)
    return posts
  }

}
