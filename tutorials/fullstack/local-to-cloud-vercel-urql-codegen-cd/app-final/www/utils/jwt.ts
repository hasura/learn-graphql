import * as jwt from "jsonwebtoken";

const HASURA_GRAPHQL_JWT_SECRET = {
  type: process.env.HASURA_JWT_SECRET_TYPE || "HS256",
  key:
    process.env.HASURA_JWT_SECRET_KEY ||
    "this-is-a-generic-HS256-secret-key-and-you-should-really-change-it",
};

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: HASURA_GRAPHQL_JWT_SECRET.type as "HS256" | "RS512",
  expiresIn: "10h",
};

interface GenerateJWTParams {
  otherClaims?: Record<string, string | string[]>;
}

export function generateJWT(params: GenerateJWTParams): string {
  const payload = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-default-role": "user",
      ...params.otherClaims,
    },
  };
  return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET.key, JWT_CONFIG);
}
