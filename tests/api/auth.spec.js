import axios from "axios";
import { clearCollection, disConneectMongo } from "../db";

describe("resolvers", () => {
    beforeEach(clearCollection);
    afterAll(disConneectMongo);
    test("should create a new account for the user", async () => {
        const response = await axios.post("http://localhost:8080/graphql", {
            query:
                `mutation Signup($input: AuthInput!)
            {
              signup(input: $input){
                user{
                  email
                }
              }
            }`,
            variables: {
                input: {
                    email: "testappwithjest@gmail.com",
                    password: "passrand",
                },
            },
        });
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject({
            data: {
                signup: {
                    user: {
                        email: "testappwithjest@gmail.com",
                    },
                },
            },
        });
    });
});
