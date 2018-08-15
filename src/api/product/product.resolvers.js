export default {
    Query: {
        async allProducts(_, args, ctx) {
            const res = await ctx.models.product.find();
            return res;
        },
        async getProduct(_, { _id }, ctx) {
            const res = await ctx.models.product.findById(_id);
            return res;
        },
    },
    Mutation: {
        async createProduct(_, { input }, ctx) {
            const res = await ctx.models.product.create(input);
            return res;
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
};
