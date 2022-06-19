import { BadRequestError } from '../ErrorHandler/errors';
import { IUser } from '../models/user.model';

const IValidate = (user: IUser) => {
    const requiredFields = ['username', 'age', 'hobbies'].sort();
    const userFields = Object.keys(user).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(userFields)) throw new BadRequestError('field');

    if (typeof user.username !== 'string') throw new BadRequestError('username');
    if (typeof user.age !== 'number') throw new BadRequestError('age');
    if (!Array.isArray(user.hobbies)) throw new BadRequestError('hobbies');

    user.hobbies.forEach(hobby => {
      if (typeof hobby !== 'string') throw new BadRequestError('hobbiesArray');
    });
}

export { IValidate };
