import { v4, validate as validateUUID } from 'uuid';
import { CrashDataBaseError, InvalidUUIDError, NotExistUserError } from '../ErrorHandler/errors';
import { IUser } from '../models/user.model';
import { IValidate } from '../User/validate';

const users: IUser[] = []

const searchUser = (id: string) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    const correctUser = users.filter(user => user.id == id);
    if (correctUser.length < 1) throw new NotExistUserError(id);
    if (correctUser.length > 1) throw new CrashDataBaseError();
    if (correctUser.length === 1) return correctUser[0];
}

const getUsers = () => users;

const createUser = (user: IUser): Promise<IUser> => {
    IValidate(user);
    return new Promise((resolve) => {
        const id = v4();
        const newUser = { ...user, id };
        users.push(newUser);
        resolve(newUser);
    });
}

const removeUser = (id: string) => {
    const existingUser = searchUser(id);
    const index = users.indexOf(existingUser as IUser);
    users.splice(index, 1);
};

const updateUser = (id: string, user: IUser) => {
    IValidate(user);
    const existingUser = searchUser(id);
    const index = users.indexOf(existingUser as IUser);
    users[index] = { ...users[index], ...user };
};

export { getUsers, createUser, removeUser, updateUser, searchUser };
