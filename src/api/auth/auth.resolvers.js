import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateUser } from '../../utils/utils';
import { APP_SECRET } from '../../config';

async function signup(_, { input }, ctx, info) {
    const { value, error } = validateUser(input);
    if(error) {
        throw new Error(error.message);
    }
    const password = await bcrypt.hash(value.password, 10);
    const user = await ctx.models.user.create({
        email: value.email,
        password,
    });
    const token = jwt.sign({ userId: user._id }, APP_SECRET);
    return {
        token,
        user: {
            _id: user._id,
            email: user.email,
        }
    };
}

export default {
    Mutation: {
        signup
    }
};
