import DataLoader from "dataloader";
import { keyBy } from "lodash";
import User from "./auth/user.model";

async function batchOwners(ownerIds) {
    console.log("no of owners has batched or converting into group", ownerIds);
    const users = await User.find({
        _id: {
            $in: ownerIds,
        },
    });
    const userByIds = keyBy(users, "_id");
    console.log("user by id: ", userByIds);
    return ownerIds.map(ownerId => userByIds[ownerId]);
}

const ownerLoader = () => new DataLoader(ownerIds => batchOwners(ownerIds));

export default function () {
    return {
        owner: ownerLoader(),
    };
}
