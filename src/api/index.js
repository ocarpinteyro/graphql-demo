import product from './product';
import auth from './auth';
import { merge } from 'lodash';

console.log(merge({}, auth.resolvers, product.resolvers));

export default {
    resolvers: merge({}, auth.resolvers, product.resolvers),
    typeDefs: [product.typeDefs, auth.typeDefs].join(' '),
    context: {
        models: {
            product: product.model,
            user: auth.model,
        }
    }
}
