import {atom} from 'recoil';

interface User{
    email: string;
    fullname:{
        firstname: string;
        lastname?: string;
    };
}

export const userAtom = atom<User>({
    key: 'userAtom',
    default:{
        email: '',
        fullname:{
            firstname: '',
            lastname: ''
        }
    },
});