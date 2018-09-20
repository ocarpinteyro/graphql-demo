import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import { APP_SECRET, CLIENT_KEY } from "../../config";

async function requireAuth(resolver, parent, arg, ctx) {
    const Authorization = ctx.request.get("Authorization");
    if (!Authorization) {
        throw new AuthenticationError("Authorization header is missing");
    }
    const token = Authorization.replace("Bearer ", "");
    const { userId, clientKey } = jwt.verify(token, APP_SECRET);
    const user = await ctx.models.user.findOne({ _id: userId });
    if (!user) {
        if (clientKey !== CLIENT_KEY) {
            throw new AuthenticationError("UnAuthenticated");
        }
    } else {
        ctx.userId = user._id;
    }
    return resolver(); // Call the next resolver
}

export const authMiddleware = {
    Mutation: {
        createProduct: requireAuth
    }
}
