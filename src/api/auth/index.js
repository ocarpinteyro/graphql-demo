import userModel from "./user.model";
import authResolvers from "./auth.resolvers";
import { loadGQLFile } from "../../utils/gqlLoader";

export default {
    model: userModel,
    resolvers: authResolvers,
    typeDefs: loadGQLFile("auth/auth.graphql"),
};
