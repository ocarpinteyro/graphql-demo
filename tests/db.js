import mongoose from "mongoose";
import Product from "../src/api/product/product.model";
import Event from "../src/api/event/event.model";
import User from "../src/api/auth/user.model";

mongoose.Promise = global.Promise;

const models = {
    product: Product,
    event: Event,
    user: User,
};

const connectToDB = async () => {
    const connection = await mongoose.connect("mongodb://localhost/gql_test");
    return connection;
};

const generateMongooseId = () => mongoose.Types.ObjectId();

function clearCollection(done) {
    function clearCollections() {
        for (let collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].remove(function () { });
        }
        return done();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect("mongodb://localhost/gql_test", (err) => {
            if (err) throw err;
            return clearCollections();
        });
    } else {
        return clearCollections();
    }
}

function disConneectMongo(done) {
    mongoose.disconnect();
    return done();
}


export {
    connectToDB,
    generateMongooseId,
    models,
    clearCollection,
    disConneectMongo,
};
