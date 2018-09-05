import { merge } from "lodash";
import { PubSub } from "graphql-yoga";
import product from "./product";
import auth from "./auth";
import event from "./event";
import search from "./search";
import loaders from "./dataloaders";

const pubSub = new PubSub();

export default {
    resolvers: merge({}, auth.resolvers, product.resolvers, event.resolvers, search.resolvers),
    typeDefs: [product.typeDefs, auth.typeDefs, event.typeDefs, search.typeDefs].join(" "),
    context: req => ({
        ...req,
        models: {
            product: product.model,
            user: auth.model,
            event: event.model,
        },
        pubSub,
        loaders: loaders(),
    }),
};
