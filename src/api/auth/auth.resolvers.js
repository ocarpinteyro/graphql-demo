import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateUser } from "../../utils/utils";
import { APP_SECRET } from "../../config";

async function signup(_, { input }, ctx) {
    const { value, error } = validateUser(input);
    if (error) {
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
        },
    };
}

async function login(parent, { input }, ctx) {
    const { value, error } = validateUser(input);
    if (error) {
        throw new Error(error.message);
    }
    const user = await ctx.models.user.findOne({ email: value.email });
    if (!user) {
        throw new Error("No existe el usuario con el email ingresado");
    }
    const matched = await bcrypt.compare(value.password, user.password);
    if (!matched) {
        throw new Error("Password inválido");
    }
    const token = jwt.sign({ userId: user._id }, APP_SECRET);
    return {
        token,
        user: {
            _id: user._id,
            email: user.email,
        },
    };
}

export default {
    Mutation: {
        signup,
        login,
    },
};
