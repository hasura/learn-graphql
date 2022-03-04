import { getSdk } from "~/graphql/generated";
import { GraphQLClient } from "graphql-request";

const sdk = getSdk(new GraphQLClient(process.env.GRAPHQL_ENDPOINT!));

export { sdk };
