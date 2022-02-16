import {ArticleInterface} from './article.interface';
import {MetaInterface} from './meta.interface';

export interface ArticlesResponseInterface {
  data: Array<ArticleInterface>;
  meta: MetaInterface;
}
