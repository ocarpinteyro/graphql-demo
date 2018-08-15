import { merge } from "lodash";
import product from "./product";
import auth from "./auth";

export default {
    resolvers: merge({}, auth.resolvers, product.resolvers),
    typeDefs: [product.typeDefs, auth.typeDefs].join(" "),
    context: req => ({
        ...req,
        models: {
            product: product.model,
            user: auth.model,
        },
    }),
};
