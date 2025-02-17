import { atom } from 'recoil';

interface User {
  email: string;
  fullname: {
    firstname: string;
    lastname?: string;
  };
}

export const userAtom = atom<User>({
  key: 'userState',
  default: {
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    }
  },
});