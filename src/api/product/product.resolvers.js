import { parseDate } from "../../utils/utils";

const CREATE_PRODUCT_TRIGGER = "CREATE_PRODUCT";

export default {
    Query: {
        async allProducts(_, {
            first = 5, skip = 0, filter, orderBy,
        }, ctx) {
            const query = filter
                ? {
                    $or: [
                        {
                            name: filter,
                        },
                    ],
                }
                : {};
            const res = await ctx.models.product
                .find(query)
                .select("_id name qty createdAt owner status")
                .skip(skip)
                .limit(first)
                .sort(orderBy);
            return res;
        },
        async findAllProducts(_, { first = 5, cursor }, ctx) {
            const query = {};
            if (cursor) {
                const date = parseDate(cursor);
                query.createdAt = {
                    $lt: date,
                };
            }
            return await ctx.models.product
                .find(query)
                .select("_id name qty createdAt owner status")
                .limit(first)
                .sort("-createdAt");
        },
        async getProduct(_, { _id }, ctx) {
            const res = await ctx.models.product.findById(_id);
            return res;
        },
    },
    Mutation: {
        async createProduct(_, { input }, ctx) {
            console.log("2. Product parent resolver run")
            const product = await ctx.models.product.create({
                ...input,
                owner: ctx.userId,
            });
            // Notify to user a new product has released
            ctx.pubSub.publish(CREATE_PRODUCT_TRIGGER, { newProduct: product });
            return product;
        },
        async updateProduct(_, { _id, input }, ctx) {
            const res = await ctx.models.product.findOneAndUpdate({ _id }, input, { new: true });
            return res;
        },
        async deleteProduct(_, { _id }, ctx) {
            const res = await ctx.models.product.findByIdAndRemove(_id);
            return res;
        },
    },
    Product: {
        async owner(product, args, ctx) {
            console.log("3. Onwer Resolver run");
            console.log(product);
            const owner = await ctx.models.user.findOne(
                {
                    _id: product.owner,
                },
                "_id email",
            );
            return owner;
        },
    },
    Subscription: {
        newProduct: {
            subscribe(_, args, { pubSub }) {
                // New Listener, event, trigger
                return pubSub.asyncIterator(CREATE_PRODUCT_TRIGGER);
            },
        },
    },
};
