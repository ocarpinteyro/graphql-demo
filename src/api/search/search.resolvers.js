export default {
    Query: {
        async search(_, { name }, { models }) {
            const results = await Promise.all([
                models.event.find({ name }),
                models.product.find({ name }),
            ]);
            console.log(results);
            const resultsConcat = [].concat(...results);
            console.log(resultsConcat);
            return resultsConcat;
        },
    },
    SearchResult: {
        __resolveType(searchResult) {
            if (searchResult.type === "CONCERT") {
                return "Concert";
            } if (searchResult.type === "CONFERENCE") {
                return "Conferece";
            } if (searchResult.type === "FESTIVAL") {
                return "Festival";
            }
            return "Product";
        },
    },
};
