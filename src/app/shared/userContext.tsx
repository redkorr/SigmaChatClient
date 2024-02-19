import { SetStateAction } from 'react';
import { UserModel } from '../models/user';

export interface UserContext {
  user: UserModel;
  setUser: (value: SetStateAction<UserModel | null>) => void;
}
