import { Nullish } from '../utils';

export interface HttpRequestCredentials {
  username?: Nullish<string>,
  password?: Nullish<string>,
}
