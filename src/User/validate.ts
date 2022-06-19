import { IUser } from "../models/user.model";

const IValidate = (user: IUser) => {
    const requiredFields = ['username', 'age', 'hobbies'].sort();
    const userFields = Object.keys(user).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(userFields)) throw new Error('field');

    if (typeof user.username !== 'string') throw new Error('username');
    if (typeof user.age !== 'number') throw new Error('age');
    if (!Array.isArray(user.hobbies)) throw new Error('hobbies');

    user.hobbies.forEach(hobby => {
      if (typeof hobby !== 'string') throw new Error('hobbiesArray');
    });
}

export { IValidate };
