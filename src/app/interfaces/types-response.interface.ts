import {TypeInterface} from './type.interface';
import {MetaInterface} from './meta.interface';

export interface TypesResponseInterface {
  data: Array<TypeInterface>;
  meta: MetaInterface;
}
