import {AuthorInterface} from './author.interface';
import {BrandInterface} from './brand.interface';
import {TypeInterface} from './type.interface';
import {CategoryInterface} from './category.interface';
import {ImageInterface} from './image.interface';

export interface ArticleInterface {
  uuid: string;
  title: string;
  summary: string;
  cms: string;
  content_type: string;
  url: string;
  path: string;
  created: Date | string;
  updated: Date | string;
  authors: Array<AuthorInterface>;
  subjects: any;
  category: CategoryInterface;
  brand: BrandInterface;
  type: TypeInterface;
  body?: string;
  about: string;
  primary_image: ImageInterface;
}
