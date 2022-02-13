import {AuthorInterface} from './author.interface';
import {MetaInterface} from './meta.interface';

export interface AuthorsResponseInterface {
  data: Array<AuthorInterface>;
  meta: MetaInterface;
}
